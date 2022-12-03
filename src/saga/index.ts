import {all} from "redux-saga/effects"
import { downloadFileFromStoreWatcher, removeFileFromStoreWatcher, uploadFilesListFromStoreWatcher, uploadFileToStoreWatcher } from "./fileSaga";
import {deleteProjectWatcher, projectCreateWatcher, projectUpdateWatcher, projectWatcher} from "./projectSaga";
import { taskWatcher, deleteTaskWatcher, taskUpdateWatcher, taskCreateWatcher, fetchTaskAllWatcher, fetchSubTaskAllWatcher } from "./taskSaga";

export function* rootWatcher() {
    yield all([
        projectWatcher(),
        deleteProjectWatcher(),
        projectUpdateWatcher(),
        projectCreateWatcher(),
        taskUpdateWatcher(),
        taskCreateWatcher(),
        taskWatcher(),
        deleteTaskWatcher(),
        uploadFileToStoreWatcher(),
        uploadFilesListFromStoreWatcher(),
        downloadFileFromStoreWatcher(),
        fetchTaskAllWatcher(),
        removeFileFromStoreWatcher(),
        fetchSubTaskAllWatcher()
    ])
}
