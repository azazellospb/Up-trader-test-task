import { useDispatch } from 'react-redux';
import { fetchProjects } from './../store/projectReducer';
import {put, takeEvery, call} from "redux-saga/effects"
import { TProjectBrief } from "../pages/ProjectsPage";
import { CREATE_PROJECT, DELETE_PROJECT, FETCH_PROJECTS, setProjects, UPDATE_PROJECT} from "../store/projectReducer";
import { supabase } from "../supabaseClient";

// Fetch projects


const getProjectsFromDB = async () => await supabase
.from('projects')
.select();

function* fetchProjectWorker(): any {
  const { data } = yield call(getProjectsFromDB)
    const json = yield call(() => new Promise(res => res(data)))
    yield put(setProjects(json))
}

export function* projectWatcher() {
  yield takeEvery(FETCH_PROJECTS, fetchProjectWorker)
}

// Create project

const createProjectInDB = async (newProjectData: TProjectBrief) => await supabase
  .from('projects')
  .insert([newProjectData]);
  
function* createProjectWorker(action: any): any {
  yield call(() => createProjectInDB({...action.payload}))
  yield call(() => fetchProjects())
}

export function* projectCreateWatcher() {
  yield takeEvery(CREATE_PROJECT, createProjectWorker)
} 

// Update project

const updateProjectInDB = async (id: string, newProjectData: TProjectBrief) => await supabase
.from('projects')
  .update(newProjectData)
  .eq('id', id);
  
function* updateProjectWorker(action: any): any {
  const { itemId, form } = action.payload; 
  yield call(() => updateProjectInDB(itemId, form))
  yield call(() => fetchProjects())
}

export function* projectUpdateWatcher() {
  yield takeEvery(UPDATE_PROJECT, updateProjectWorker)
} 

// Delete project
  
const deleteProjectFromDB = async (projectId: string) => {
  await supabase
  .from('projects')
  .delete()
  .eq('id',projectId);
  await supabase
  .from('tasks')
  .delete()
  .eq('projectid',projectId);
}

function* deleteProjectFromDBWorker(action: any): any {
  const { payload } = action;
  yield call(() => deleteProjectFromDB(payload))
}

export function* deleteProjectWatcher() {
  yield takeEvery(DELETE_PROJECT, deleteProjectFromDBWorker)
}
