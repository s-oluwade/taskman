'use client';

import { Session } from 'next-auth';
import { createContext, useState } from 'react';

const initialState = {
  createSubtasks: false,
  setCreateSubtasks: () => {
    return false;
  },
  createSubtasksTaskId: undefined,
  setCreateSubtasksTaskId: () => {
    return undefined;
  },
  session: null,
  setSession: () => {
    return null;
  },
};

interface IContext {
  createSubtasks: boolean;
  setCreateSubtasks: React.Dispatch<React.SetStateAction<boolean>>;
  createSubtasksTaskId: number | undefined;
  setCreateSubtasksTaskId: React.Dispatch<React.SetStateAction<number | undefined>>;
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
}

export const Context = createContext<IContext>(initialState);

const ContextProvider = ({children}: {children: React.ReactNode}) => {
  const [createSubtasks, setCreateSubtasks] = useState(false);
  const [createSubtasksTaskId, setCreateSubtasksTaskId] = useState<number | undefined>(undefined);
  const [session, setSession] = useState<Session | null>(null);
  
  return (
      <Context.Provider
        value={{
          createSubtasks,
          setCreateSubtasks,
          createSubtasksTaskId,
          setCreateSubtasksTaskId,
          session,
          setSession,
        }}>
        {children}
      </Context.Provider>
  );
};

export default ContextProvider;
