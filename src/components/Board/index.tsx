import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { TTaskObject, updateTask } from '../../store/taskReducer';
import { taskSorter, TTaskResult } from '../../tools/taskSorter';
import { TaskItem } from '../TaskItem';
import styles from './Board.module.css';
import { useDispatch } from 'react-redux';
import { TOnDragEnd } from './types';

export const Board = () => { 
  const dispatch = useDispatch();
  const tasks : TTaskObject[] = useSelector((state: IRootState) => state.taskReducer.tasks);
  const groupedTaskArray = taskSorter(tasks);
  const [columns, setColumns] = useState<TTaskResult>({});
  useEffect(()=> {
    setColumns(groupedTaskArray)
  }, [tasks])

  const onDragEnd = (result: { result?: any; columns?: TTaskResult; setColumns?: React.Dispatch<React.SetStateAction<TTaskResult>>; destination?: any; source?: any; }, columns: { [x: string]: any; }, setColumns: { (value: React.SetStateAction<TTaskResult>): void; (arg0: any): void; }) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const newState = structuredClone(columns);
      const sourceColumn = newState[source.droppableId];
      const destColumn = newState[destination.droppableId];
      const sourceTask = sourceColumn.tasks;
      const destTasks = destColumn.tasks;
      const [movedTask] = sourceTask.splice(source.index, 1);
      destTasks.push(movedTask);
      const form: TTaskObject = { status: destination.droppableId };
      const itemId = movedTask.id;
      newState[source.droppableId].tasks = structuredClone(sourceTask);
      newState[destination.droppableId].tasks = structuredClone(destTasks);
      dispatch(updateTask({ itemId, form }));
      setColumns(newState);
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.tasks];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          tasks: copiedItems
        }
      });
    }
  };


  return (
    <div className={styles.board}>
      <DragDropContext className={styles.boardWrapper}
        onDragEnd={(result: TOnDragEnd) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              className={styles.boardColumn}
              key={columnId}
            >
              <h2 className={styles.boardTitle}>{column.title}</h2>
              <div className={styles.boardZone}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided: { droppableProps: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>; innerRef: React.LegacyRef<HTMLDivElement> | undefined; placeholder: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }, snapshot: { isDraggingOver: any; }) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {column.tasks.map((task, index: any) => {
                          return (
                            <Draggable
                              key={task.id}
                              draggableId={task.id}
                              index={index}
                            >
                              {(provided: { innerRef: React.LegacyRef<HTMLDivElement> | undefined; draggableProps: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>; dragHandleProps: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>; }, snapshot: { isDragging: any; }) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <TaskItem className="sss" task={task}/>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  )
}
