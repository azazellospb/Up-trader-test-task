export type TTaskObject = {
  id?: string,
  number?: number,
  title?: string,
  description?: string
  creationDate?: Date,
  inProgressPeriod?: string,
  completionDate?: Date,
  priority?: string,
  status: string,
  author?: string,
  parent?: string,
  projectid?: string,
}

export interface ITaskReducerState {
  tasks: TTaskObject[],
  subtasks: TTaskObject[],
  lastTaskIdNumber: number
}

const initialState: ITaskReducerState = {
  tasks: [],
  subtasks: [],
  lastTaskIdNumber: 0
}

export const DELETE_TASK = "DELETE_TASK"
export const SET_TASKS = "SET_TASKS"
export const SET_SUBTASKS = "SET_SUBTASKS"
export const FETCH_TASKS = "FETCH_TASKS"
export const UPDATE_TASK = "UPDATE_TASK";
export const CREATE_TASK = "CREATE_TASK";
export const DELETE_ALL_TASKS = "DELETE_ALL_TASKS";
export const DELETE_ALL_SUBTASKS = "DELETE_ALL_SUBTASKS";
export const FETCH_ALL_TASKS = "FETCH_ALL_TASKS";
export const FETCH_SUBTASKS = "FETCH_SUBTASKS";

export const taskReducer = (state = initialState, action: any) => {
  switch(action.type) { 
    case DELETE_TASK: 
      return {...state, tasks: [...state.tasks.filter(task => task.id !== action.payload.taskId)]}
    case SET_TASKS:
      let taskArr: TTaskObject[] = []
      let subtaskArr: TTaskObject[] = []
      
      let lastTaskID = action.payload.json.reduce((a:number, c: TTaskObject) => {
        if (c.projectid === action.payload.projectId && !c.id!.includes('subtask')) taskArr.push(c);
        if (c.projectid === action.payload.projectId && c.id!.includes('subtask')) subtaskArr.push(c);
        return (a < +c.id!.replace(/\D/g, "")) ? a = +c.id!.replace(/\D/g, "") : a}, 0)
      return {...state, subtasks: subtaskArr, tasks: taskArr, lastTaskIdNumber: lastTaskID};
    case SET_SUBTASKS:
      let lastsubTaskID =  action.payload.json.reduce((a:number, c: TTaskObject) => (a < +c.id!.replace(/\D/g, "")) ? a = +c.id!.replace(/\D/g, "") : a, 0)
      return {...state, subtasks: [...action.payload.json], lastTaskIdNumber: lastsubTaskID };
    case DELETE_ALL_TASKS: 
      return {...state, tasks: []};
    case DELETE_ALL_SUBTASKS: 
      return {...state, subtasks: []};
    default:
      return state;
  }
}

export type TUpdateTask = {
  itemId: string;
  form: TTaskObject
}

type TSetTasks = {
  json: TTaskObject[],
  projectId: string
}

export type TaskUpdate = {
  itemId: string;
  form: TTaskObject;
}

export const deleteTask = (payload: string) => ({type: DELETE_TASK, payload })
export const deleteAllTask = () => ({type: DELETE_ALL_TASKS })
export const deleteAllSubtasks = () => ({type: DELETE_ALL_SUBTASKS })

export const setTasks = (payload: TSetTasks) => ({type: SET_TASKS, payload })
export const setSubtasks = (payload: Omit<TSetTasks, "projectId">) => ({type: SET_SUBTASKS, payload })

export const fetchAllTasks = (payload: string) => ({ type: FETCH_ALL_TASKS, payload })
export const fetchTasks = (payload: string) => ({type: FETCH_TASKS, payload})
export const fetchSubTasks = (payload: string) => ({type: FETCH_SUBTASKS, payload})

export const updateTask = (payload: TaskUpdate) => ({type: UPDATE_TASK, payload})

export const createTask = (payload: TTaskObject) => ({type: CREATE_TASK, payload})