import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { IRootState } from '../../store'
import { uploadFile, uploadFilesList } from '../../store/fileReducer'
import { hideModal, TModalItem } from '../../store/modalReducer'
import { createProject, fetchProjects, updateProject } from '../../store/projectReducer'
import { createTask, fetchTasks, updateTask, TTaskObject, fetchSubTasks, deleteAllSubtasks, fetchAllTasks } from '../../store/taskReducer'
import { CustomButton } from '../CustomButton'
import { CustomList } from '../CustomList'
import { AddProjectIcon } from '../icons/AddProjectIcon'
import { AddTaskIcon } from '../icons/AddTaskIcon'
import { DoneIcon } from '../icons/DoneIcon'
import { UploadFileIcon } from '../icons/UploadFileIcon'
import { InputBlock } from '../InputBlock'
import styles from "./CustomUpdateForm.module.css"



const initial:TTaskObject  = {
  title: '',
  description: '',
  author: '',
  priority: 'low',
  status: 'queue',
  id: '',
  // projectid: '',
  number: 0
}

const subTaskInitinal = {
  id: '',
  description: '',
  parent: '',
  projectid: '',
  status: '',
}


export const CustomUpdateForm = ({ itemId } : TModalItem ) => {
  const [form, setForm] = useState(initial);
  const [file, setFile] = useState<File>();
  const [state, setState] = useState(false);
  const [subtask, setSubtask] = useState(subTaskInitinal);
  
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname as string;
  const projectId =  path.match(/[^/]*$/g)![0];
  const type  = String(itemId).match(/[A-Za-z]+/g) as RegExpMatchArray
  const key = !!type ? type[0] : '';
  const creationData = form.created_at! ? new Date(form.created_at) : null;
  const atWorkData = form.atWorkDate! ? new Date(form.atWorkDate) : null;
  const completionData = form.completionDate! ? new Date(form.completionDate) : null;
  const creationDataFormatted = creationData ? creationData!.toISOString().slice(0,10) : null;
  const atWorkDataFormatted = atWorkData ? atWorkData.toISOString().slice(0,10) : null;
  const completionDataFormatted = completionData ? completionData.toISOString().slice(0,10) : null;
  const atWorkPeriod = atWorkData ? Math.abs((new Date()).getTime() - atWorkData!.getTime())/3600000 : 0;
  const isProject = key.includes('project');
  const isTask = key === 'task';
  const isNewProject = key === 'newproject'
  const isNewTask = key === 'newtask';
  const isNewItem = key.includes('new');
  const inProgress = form.atWorkDate && !Boolean(form.completionDate);
  const isCompleted = Boolean(form.completionDate)
  const fileList = useSelector((state: IRootState) => state.fileReducer)
  const subTaskList = useSelector((state: IRootState) => state.taskReducer.subtasks)
  const itemArray = useSelector((state: IRootState) => {
    if (isProject) {
      return state.projectReducer.projects
    } else {
      return state.taskReducer.tasks
    }
  }) ?? [];

  const freeIdNumber = 1 + useSelector((state: IRootState) => {
    if (isNewProject) {
      return state.projectReducer.lastProjectIdNumber
    } else {
      return state.taskReducer.lastTaskIdNumber
    }
  });

  useEffect(() => {
    dispatch(uploadFilesList(itemId));
    dispatch(fetchSubTasks(itemId));
  }, [dispatch, state])

  useEffect(() => {
    const itemCard: any = itemArray.find((item: any) => item.id === itemId);
    isNewItem ? setForm(initial) : setForm({...itemCard});
  }, [itemId]);
  
  const getLabel = (label: string) => isProject ? label.concat(' проекта:' ) : label.concat(' задачи:');
  const getTitle = () => {
    if (isNewItem) {
      return <h2 className={styles.title}>Создать{' '}{isNewProject ? 'проект' : 'задачу'}</h2>
    } else return <h2 className={styles.title}>Внести изменения в{' '}{isProject ? 'проект №' : 'задачу №'}{form.number}</h2>
  }
  
  const handleFileUpload = () => {
    file && dispatch(uploadFile({ itemId, file }))
    setState((prev: boolean) => !prev);
  }

  const handleCreateSubTask = () => {
    subtask.description && dispatch(createTask({ ...subtask, parent: itemId,  projectid: projectId, id: 'subtask' + freeIdNumber }))
    setState((prev: boolean) => !prev);
  } 

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  return (
    <div className={styles.updateFormBox}>
      {getTitle()}
      <form className={styles.updateForm}>
        {!isNewItem && <p><>Дата создания задачи: {creationDataFormatted}</></p>}
        {inProgress && <p><>В работе с: {atWorkDataFormatted}</></p>}
        {inProgress && <p><>Время в работе: {atWorkPeriod < 1 ? 'Менее часа' : `${atWorkPeriod} часов`}</></p>}
        {isCompleted && <p><>Дата окончания: {completionDataFormatted}</></p>}
        <InputBlock handleChange={(title:string) => setForm({...form, title})} initialValue={form.title} label={getLabel('Наименование')}/>
        <InputBlock tagName="textarea" handleChange={(description:string) => setForm({...form, description})} initialValue={form.description} label={getLabel('Описание')} />
        <InputBlock handleChange={(author: string) => setForm({...form, author})} initialValue={form.author} label={getLabel('Автор')}/>
        {isTask && (
          <>
            <label>
              {getLabel('Статус')}
              <select 
                value={form.status}
                onChange={(event: any) => {
                  const isRefreshed = form.status === 'done' && event.target.value !== 'done'
                  const isTakenToWork = event.target.value === "development"
                  const isFinished = event.target.value === "done"
                  !isRefreshed && setForm({...form, completionDate: isFinished ? new Date() : null, atWorkDate: isTakenToWork ? new Date() : null, status: event.target.value})
                  isRefreshed && setForm({...form, completionDate: null, atWorkDate: null, status: event.target.value})
                }} 
                name="selectStatus"
              >
                <option value="queue">В очереди</option>
                <option value="development" >В разработке</option>
                <option value="done">Выполнена</option>
              </select>
            </label>
            <label>
              {getLabel('Приоритет')}
              <select value={form.priority} onChange={(event:any) => setForm({...form, priority: event.target.value})} name="selectStatus">
                <option value="low">Низкий</option>
                <option value="medium" >Средний</option>
                <option value="high">Высокий</option>
              </select>
            </label>
          </>
        )}
      </form>
      {isTask && !isNewItem && (
        <>
          <div className={styles.listBoxes}>
            <h5 className={styles.listTitle}>Подзадачи:</h5>
            <CustomList callback={setState} list={subTaskList} taskId={itemId}/>
            <form className={styles.uploadControls}>
              <InputBlock placeholder='Описание подзадачи' handleChange={(description:string) => setSubtask({...subtask, description})} initialValue={subtask.description} label=""/>
              <CustomButton style={styles.CustomBtn} handleClick={handleCreateSubTask}>
                Добавить подзадачу
              </CustomButton>
            </form>
          </div>
          <div className={styles.listBoxes}>
            <h5 className={styles.listTitle}>Файлы:</h5>
            <CustomList callback={setState} list={fileList.files} taskId={itemId}/>
            <form className={styles.uploadControls}>
              <label className={styles.selectFileInputLabel}>
                <input id="file-upload" className={styles.selectFileInput} onChange={handleFileChange} type="file" accept="audio/*,image/*,application/msword,.txt,.pdf"/>
              </label>
              <CustomButton style={styles.CustomBtn} handleClick={handleFileUpload}>
                <UploadFileIcon />
                Загрузить
              </CustomButton>
            </form>
          </div>
        </>
      )}
      <div className={styles.controls}>
        <CustomButton 
          style={styles.CustomBtn}
          handleClick={() => {
            console.log(isNewItem, isNewProject);
            !isNewItem ? dispatch(isProject ? updateProject({ itemId, form }) : updateTask({ itemId, form }))
            : dispatch(isNewProject ? createProject({ ...form, number: freeIdNumber, id: 'project' + freeIdNumber }) : createTask({ ...form, number: freeIdNumber, projectid: projectId, id: 'task' + freeIdNumber }));
            (isNewTask || isTask) && dispatch(fetchTasks(projectId));
            dispatch(fetchProjects());
            dispatch(fetchAllTasks(projectId));
            dispatch(hideModal());
          }}
        >
          {!isNewItem && <DoneIcon />}
          {isNewItem && (isNewProject ? <AddProjectIcon/> : <AddTaskIcon/>)}
          <p>{isNewItem ? 'Создать' : 'Сохранить'}</p>
        </CustomButton>
        <CustomButton 
          style={styles.CustomBtn}
          handleClick={() => {
          dispatch(hideModal());
          dispatch(deleteAllSubtasks());
          }}
        >
          <p>Выйти без изменений</p>
        </CustomButton>
      </div>
    </div>
  )
}

