import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import { ROUTES } from './constants/routeConstants';
import { ProjectsPage } from './pages/ProjectsPage';
import { TasksPage } from './pages/TasksPage';
import { Page404 } from './pages/Page404';
import { store } from './store';
import { Provider } from 'react-redux';




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={ROUTES.mainPage} element={<App/>}>
              <Route path={ROUTES.projectsPage}>
                <Route index element={<ProjectsPage/>} />
                <Route path=":project" element={<TasksPage />} />
              </Route>
              <Route path="*" element={<Page404 />} />
              <Route
                  path={ROUTES.mainPage}
                  element={<Navigate to={ROUTES.projectsPage} replace />}
              />
            </Route>  
          </Routes>
        </BrowserRouter>
      </Provider>
);
