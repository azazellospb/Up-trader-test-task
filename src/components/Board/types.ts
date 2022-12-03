import { TTaskResult } from "../../tools/taskSorter";

export type TBoard = {
  project: string 
}

export type TOnDragEnd = {
  result: any;
  columns: TTaskResult;
  setColumns: React.Dispatch<React.SetStateAction<TTaskResult>>;
}
