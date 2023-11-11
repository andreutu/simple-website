import React, { ReactNode, createContext, useReducer, Reducer } from 'react';
import { SIDEBAR_OPEN, SIDEBAR_CLOSE } from "../actions.ts";

type StateType = { isSidebarOpen: boolean };
type ActionType = { type: string, payload?: string };

interface IContextProps {
  isSidebarOpen: boolean;
  openSidebar: () => void
  closeSidebar: () => void
}

const initialState: StateType = { isSidebarOpen: false };
export const ProductsContext = createContext<IContextProps | null>(null);

function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case SIDEBAR_OPEN:
      console.log("OPEN")
      return { ...state, isSidebarOpen: true };
    case SIDEBAR_CLOSE:
      return { ...state, isSidebarOpen: false };
    default:
      throw Error("No action type found!");
  }
}

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<StateType, ActionType>>(reducer, initialState);

  function openSidebar(): void {
    dispatch({ type: SIDEBAR_OPEN });
  }

  function closeSidebar(): void {
    dispatch({ type: SIDEBAR_CLOSE });
  }

  return <ProductsContext.Provider value={{ ...state, openSidebar, closeSidebar }}>
    {children}
  </ProductsContext.Provider>
};