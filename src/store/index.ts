import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";

import createSagaMiddleware from 'redux-saga'
import { rootWatcher } from "../saga";
import { modalReducer } from "./modalReducer";
import { projectReducer } from "./projectReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import { taskReducer } from "./taskReducer";
import { fileReducer } from "./fileReducer";

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  projectReducer,
  taskReducer,
  modalReducer,
  fileReducer,
})

const composeEnhancers = composeWithDevTools({trace: true})

export const store = createStore(
  rootReducer, 
  composeEnhancers(applyMiddleware(sagaMiddleware))
)
export type IRootState = ReturnType<typeof rootReducer>;

sagaMiddleware.run(rootWatcher)