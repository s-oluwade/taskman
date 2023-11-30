"use client";

import {createContext, useState} from 'react';

const initialState = {
  createSubtasks: false,
  setCreateSubtasks: () => {
    return false;
  },
  createSubtasksTaskId: undefined,
  setCreateSubtasksTaskId: () => {
    return undefined;
  }
};

interface IContext {
  createSubtasks: boolean;
  setCreateSubtasks: React.Dispatch<React.SetStateAction<boolean>>;
  createSubtasksTaskId: number | undefined;
  setCreateSubtasksTaskId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const Context = createContext<IContext>(initialState);

const ContextProvider = ({children}: {children: React.ReactNode}) => {
  const [createSubtasks, setCreateSubtasks] = useState(false);
  const [createSubtasksTaskId, setCreateSubtasksTaskId] = useState<number | undefined>(undefined);

  return (
    <Context.Provider
      value={{
        createSubtasks,
        setCreateSubtasks,
        createSubtasksTaskId,
        setCreateSubtasksTaskId,
      }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
