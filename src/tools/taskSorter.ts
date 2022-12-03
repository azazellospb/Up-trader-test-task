import { TTaskObject } from "../store/taskReducer";

type TSortedGroups = {
  id: number,
  title: string,
  tasks: TTaskObject[]
};

export type TTaskResult = {
  [key:string]: TSortedGroups
} 

export const taskSorter = (array: TTaskObject[]) => {
  const sortedByGroupesArray: TTaskResult = {
    queue: {id: 1, title: "queue", tasks: []},
    development: {id: 2, title: "development", tasks: []},
    done: {id: 3, title: "done", tasks: []}
  };
  array.map((task) => sortedByGroupesArray[task.status].tasks.push(task))
  return sortedByGroupesArray;
}