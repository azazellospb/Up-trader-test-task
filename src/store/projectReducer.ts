import { TProjectBrief } from './../pages/ProjectsPage/index';
import { TTaskObject, TUpdateTask } from './taskReducer';

export interface IProjectReducerState {
  projects: TProjectBrief[],
  lastProjectIdNumber: number
}

const defaultState = {
  projects: [],
  lastProjectIdNumber: 0
} as IProjectReducerState

export const SET_PROJECTS = "SET_PROJECTS";
export const FETCH_PROJECTS = "FETCH_PROJECTS";
export const DELETE_PROJECT = "DELETE_PROJECT";
export const UPDATE_PROJECT = "UPDATE_PROJECT";
export const CREATE_PROJECT = "CREATE_PROJECT";

export const projectReducer = (state = defaultState, action: any) => {
  switch(action.type) {
    case SET_PROJECTS:
      let lastProjectID = action.payload.reduce((a:number, c: TProjectBrief) => (a < +c.id.replace(/\D/g, "")) ? a = +c.id.replace(/\D/g, "") : a, 0)
      return {...state, projects: action.payload, lastProjectIdNumber: lastProjectID};
    case DELETE_PROJECT:
      return { ...state, projects: [...state.projects.filter(project => project.id !== action.payload)]};
    case UPDATE_PROJECT:
      const updateProjectsIndex = state.projects.findIndex((projects => projects.id === action.payload.itemId));
      const newValue = {...state.projects[updateProjectsIndex], ...action.payload.form}
      const projects = [...state.projects]
      projects[updateProjectsIndex] = newValue
      return {...state, projects};
    case CREATE_PROJECT:
      const projectsArr = [...state.projects];
      projectsArr.push(action.payload);
      return {...state, projects: projectsArr};  
    default:
      return state;
  }
}


export const setProjects = (payload: TProjectBrief[]) => ({type: SET_PROJECTS, payload})
export const updateProject = (payload: TUpdateTask) => ({type: UPDATE_PROJECT, payload})
export const createProject = (payload: TTaskObject) => ({type: CREATE_PROJECT, payload})
export const fetchProjects = () => ({type: FETCH_PROJECTS})
export const deleteProject = (payload: string) => ({type: DELETE_PROJECT, payload})