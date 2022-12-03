import { CREATE_TASK, FETCH_SUBTASKS, setSubtasks, TTaskObject } from './../store/taskReducer';
import {put, takeEvery, call} from "redux-saga/effects"
import { DELETE_TASK, UPDATE_TASK, FETCH_TASKS, FETCH_ALL_TASKS, setTasks} from "../store/taskReducer";
import { supabase } from '../supabaseClient';

// Fetch tasks by project

const getTasksFromDB = async (projectId: string) => await supabase
.from('tasks')
.select()
.eq('projectid', String(projectId))

function* fetchTaskWorker(action: any): any {
    const { payload } = action;
    const projectId = payload;
    const { data } = yield call(() => getTasksFromDB(payload))
    const json: TTaskObject[] = yield call(() => new Promise(res => res(data))) 
    yield put(setTasks({json, projectId}))
}

export function* taskWatcher() {
  yield takeEvery(FETCH_TASKS, fetchTaskWorker)
}

// Fetch all tasks


const getAllTasksFromDB = async (projectId: string) => await supabase
.from('tasks')
.select('*');

function* fetchAllTaskWorker(action: any): any {
    const projectId = action.payload;
    const { data } = yield call(() => getAllTasksFromDB(projectId))
    const json = yield call(() => new Promise(res => res(data)))
    yield put(setTasks({ json, projectId } ))
}

export function* fetchTaskAllWatcher() {
  yield takeEvery(FETCH_ALL_TASKS, fetchAllTaskWorker)
}

// Fetch subtasks by task


const getAllSubTasksFromDB = async (parentId: string) => await supabase
.from('tasks')
.select()
.eq('parent', String(parentId))

function* fetchAllSubTaskWorker(action: any): any {
    const projectId = action.payload;
    const { data } = yield call(() => getAllSubTasksFromDB(projectId))
    const json = yield call(() => new Promise(res => res(data)))
    yield put(setSubtasks({ json } ))
}

export function* fetchSubTaskAllWatcher() {
  yield takeEvery(FETCH_SUBTASKS, fetchAllSubTaskWorker)
}

// Delete task

const deleteTaskFromDB = async (taskId: string) => { await supabase
.from('tasks')
  .delete()
  .eq('id', String(taskId));
  await supabase
  .storage
  .from('files')
  .remove([`public/${taskId}/*`]);
}

function* deleteTaskFromDBWorker(action: any): any {
  const { payload } = action;
  yield call(() => deleteTaskFromDB(payload))
}


export function* deleteTaskWatcher() {
  yield takeEvery(DELETE_TASK, deleteTaskFromDBWorker)
}

// Create task

const createTaskInDB = async (newTaskData: TTaskObject) => await supabase
  .from('tasks')
  .insert([newTaskData]);
  
function* createTaskWorker(action: any): any {
  yield call(() => createTaskInDB({...action.payload}))
}
export function* taskCreateWatcher() {
  yield takeEvery(CREATE_TASK, createTaskWorker)
}

// Update task

const updateTaskInDB = async (id: string, newTaskData: TTaskObject) => await supabase
.from('tasks')
  .update(newTaskData)
  .eq('id', id);
  
function* updateTaskWorker(action: any): any {
  const { itemId, form } = action.payload; 
  yield call(() => updateTaskInDB(itemId, form))
}
export function* taskUpdateWatcher() {
  yield takeEvery(UPDATE_TASK, updateTaskWorker)
}


