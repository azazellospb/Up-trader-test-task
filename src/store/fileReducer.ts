import { THandleFileInStore, TUploadFileToStore } from "../saga/fileSaga";

interface IFilesReducerState {
  files: string[],
}

const initialState: IFilesReducerState = {
  files: [],
}

export const UPLOAD_FILE = "UPLOAD_FILE"
export const UPLOAD_FILE_LIST = "UPLOAD_FILE_LIST"
export const SET_FILE_LIST = "SET_FILE_LIST"
export const DOWNLOAD_FILE = "DOWNLOAD_FILE"
export const REMOVE_FILE = "REMOVE_FILE"


export const fileReducer = (state = initialState, action: any) => {
  switch(action.type) { 
    case SET_FILE_LIST:
      return {...state, files: action.payload};
    default:
      return state;
  }
}


export const uploadFile = (payload: TUploadFileToStore) => ({type: UPLOAD_FILE, payload });
export const uploadFilesList = (payload: string) => ({type: UPLOAD_FILE_LIST, payload });
export const setFileList = (payload: any) => ({type: SET_FILE_LIST, payload })
export const downloadFile = (payload: THandleFileInStore) => ({type: DOWNLOAD_FILE, payload })
export const removeFile = (payload: THandleFileInStore) => ({type: REMOVE_FILE, payload })