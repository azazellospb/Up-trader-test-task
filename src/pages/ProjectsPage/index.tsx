import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CustomRowItem } from '../../components/CustomRowItem'
import { IRootState } from '../../store'
import { fetchProjects } from '../../store/projectReducer'
import { deleteAllTask } from '../../store/taskReducer'
import styles from './ProjectPage.module.css'

export type TProjectBrief = {
  id: string,
  title: string,
  description: string,
  isActive: boolean,
  creationDate?: Date,
  author?: string
}

export const ProjectsPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(deleteAllTask());
  }, [dispatch]);
  const projects : TProjectBrief[] = useSelector((state: IRootState) => state.projectReducer.projects)
  return (
    <div className={styles.projectsPageContainer}>
      <div className={styles.projectsMainWindow}>
        <div className={styles.projectList}>
          {projects ? projects.map(project => <CustomRowItem key={project.id} item={project} />) : (<div>Пока нет проектов</div>)}
        </div>
      </div>
    </div>
  )
}