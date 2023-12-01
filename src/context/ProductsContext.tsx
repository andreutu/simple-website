import { ReactNode, createContext, useContext, useReducer, Reducer, Dispatch, useEffect } from 'react';
import { SIDEBAR_OPEN, SIDEBAR_CLOSE, GET_PRODUCTS_BEGIN, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR } from "../utils/actions.ts";
import axios from 'axios';
import { products_url } from '../utils/constants.ts';

type StateType = {
  isSidebarOpen: boolean

  products_loading: boolean
  products_error: boolean
  products: any[]

  featured_products: any[]

  single_product_loading: boolean
  single_product_error: boolean
  single_product: {}
};

type ActionType = {
  type: string
  payload?: any
};

interface IContextProps {
  state: StateType;
  dispatch: Dispatch<ActionType>;
  openSidebar: () => void;
  closeSidebar: () => void;
}

const initialState: StateType = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {}
};

function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: true };
    case SIDEBAR_CLOSE:
      return { ...state, isSidebarOpen: false };
    case GET_PRODUCTS_BEGIN:
      return { ...state, products_loading: true };
    case GET_PRODUCTS_SUCCESS:
      return { ...state, products_loading: false, products: action.payload };
    case GET_PRODUCTS_ERROR:
      return { ...state, products_loading: false, products_error: true };
    default:
      throw Error("No action type found!");
  }
}

export const ProductsContext = createContext<IContextProps>({
  state: initialState,
  dispatch: () => null,
  openSidebar: () => null,
  closeSidebar: () => null
});

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<StateType, ActionType>>(reducer, initialState);

  function openSidebar(): void { dispatch({ type: SIDEBAR_OPEN }); }
  function closeSidebar(): void { dispatch({ type: SIDEBAR_CLOSE }); }

  async function fetchProducts(url: string) {
    dispatch({ type: GET_PRODUCTS_BEGIN });

    try {
      const response = await axios.get(url);
      const products = response.data;
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  }

  useEffect(() => {
    fetchProducts(products_url);
  }, []);

  return <ProductsContext.Provider value={{ state, dispatch, openSidebar, closeSidebar }}>
    {children}
  </ProductsContext.Provider>
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
}