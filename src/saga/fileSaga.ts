import { call, put, takeEvery } from "redux-saga/effects";
import { setFileList, UPLOAD_FILE, UPLOAD_FILE_LIST, DOWNLOAD_FILE, REMOVE_FILE, uploadFilesList } from "../store/fileReducer";
import { supabase } from "../supabaseClient";
import { fileLoader } from "../tools/fileLoader";

// Upload file

export type TUploadFileToStore = {
  itemId: string;
  file: File;
}


const uploadFileToStore = async ({ itemId, file }: TUploadFileToStore) => await supabase.storage
  .from('files')
  .upload('public/' + itemId + '/' + file?.name, file as File,
  {
    upsert: true
  });

function* uploadFileToStoreWorker(action: any): any {
  yield call(() => uploadFileToStore({...action.payload}))
}

export function* uploadFileToStoreWatcher() {
  yield takeEvery(UPLOAD_FILE, uploadFileToStoreWorker)
}

// Upload Files list

const uploadFilesListFromStore = async (itemId: string) => await supabase.storage
  .from('files')
  .list(`public/${itemId}`);

function* uploadFilesListFromStoreWorker(action: any): any {
  const { data, error } = yield call(() => uploadFilesListFromStore(action.payload))
  const json = yield call(() => new Promise(res => res(data)))
  yield put(setFileList(json))
}

export function* uploadFilesListFromStoreWatcher() {
  yield takeEvery(UPLOAD_FILE_LIST,  uploadFilesListFromStoreWorker)
}


export type THandleFileInStore = {
  item: string;
  taskId: string;
}

// Download file



const downloadFileFromStore = async ({ item, taskId } : THandleFileInStore) => await supabase.storage
  .from('files')
  .getPublicUrl(`public/${taskId}/${item}`);

function* downloadFileFromStoreWorker(action: any): any {
  const data = yield call(() => downloadFileFromStore({...action.payload}))
  fileLoader(data.data.publicUrl);
}

export function* downloadFileFromStoreWatcher() {
  yield takeEvery(DOWNLOAD_FILE, downloadFileFromStoreWorker)
}

// Delete file



const removeFileFromStore = async ({ item, taskId } : THandleFileInStore) => await supabase.storage
  .from('files')
  .remove([`public/${taskId}/${item}`]);

function* removeFileFromStoreWorker(action: any): any {
  const { payload } = action
  const { taskId } = payload
  yield call(() => removeFileFromStore(payload))

}

export function* removeFileFromStoreWatcher() {
  yield takeEvery(REMOVE_FILE, removeFileFromStoreWorker)
}
