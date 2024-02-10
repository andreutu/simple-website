import {
	ReactNode,
	Reducer,
	createContext,
	useContext,
	useEffect,
	useReducer,
} from "react";
import { useProductsContext } from "./ProductsContext";

import "../utils/actions.ts";
import {
	CLEAR_FILTERS,
	FILTER_PRODUCTS,
	LOAD_PRODUCTS,
	SET_GRIDVIEW,
	SET_LISTVIEW,
	SORT_PRODUCTS,
	UPDATE_FILTERS,
	UPDATE_SORT,
} from "../utils/actions.ts";

type FilterType = {
	text: string;
	company: string;
	category: string;
	color: string;
	min_price: number;
	max_price: number;
	price: number;
	shipping: boolean;
};

interface DataType {
	filtered_products: any[];
	all_products: any[];
	grid_view: boolean;
	sort: string;
	filters: FilterType;
}

type ActionType = {
	type: string;
	payload?: any;
};

interface ContextProps {
	filtered_products: any[];
	all_products: any[];
	grid_view: boolean;
	sort: string;
	filters: FilterType;
	setGridView: () => void;
	setListView: () => void;
	updateSort: (e: any) => void;
	updateFilters: (e: any) => void;
	clearFilters: () => void;
}

const initialState: DataType = {
	filtered_products: [],
	all_products: [],
	grid_view: false,
	sort: "price-lowest",
	filters: {
		text: "",
		company: "all",
		category: "all",
		color: "all",
		min_price: 0,
		max_price: 0,
		price: 0,
		shipping: false,
	},
};

const initialContextState: ContextProps = {
	filtered_products: [],
	all_products: [],
	grid_view: false,
	sort: "price-lowest",
	filters: initialState.filters,
	setGridView: () => null,
	setListView: () => null,
	updateSort: () => null,
	updateFilters: () => null,
	clearFilters: () => null,
};

function reducer(state: DataType, action: ActionType) {
	switch (action.type) {
		case LOAD_PRODUCTS:
			let maxPrice = action.payload.map((p: any) => p.price);
			maxPrice = Math.max(...maxPrice);

			return {
				...state,
				all_products: [...action.payload],
				filtered_products: [...action.payload],
				filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
			};
		case SET_GRIDVIEW:
			return { ...state, grid_view: true };
		case SET_LISTVIEW:
			return { ...state, grid_view: false };
		case UPDATE_SORT:
			return { ...state, sort: action.payload };
		case SORT_PRODUCTS: {
			const { sort, filtered_products } = state;
			let tempProducts = [...filtered_products];

			if (sort === "price-lowest") {
				tempProducts = tempProducts.sort((a, b) => a.price - b.price);
			}

			if (sort === "price-highest") {
				tempProducts = tempProducts.sort((a, b) => b.price - a.price);
			}

			if (sort === "name-a") {
				tempProducts = tempProducts.sort((a, b) =>
					a.name.localeCompare(b.name),
				);
			}

			if (sort === "name-z") {
				tempProducts = tempProducts.sort((a, b) =>
					b.name.localeCompare(a.name),
				);
			}

			return { ...state, filtered_products: tempProducts };
		}
		case FILTER_PRODUCTS: {
			const { all_products } = state;
			const { text, category, company, color, price, shipping } = state.filters;
			let tempProducts = [...all_products];

			if (text) {
				tempProducts = tempProducts.filter((product) =>
					product.name.toLowerCase().startsWith(text.toLowerCase()),
				);
			}
			if (category !== "all") {
				tempProducts = tempProducts.filter((product) =>
					product.category.toLowerCase().startsWith(category.toLowerCase()),
				);
			}
			if (company !== "all") {
				tempProducts = tempProducts.filter((product) =>
					product.company.toLowerCase().startsWith(company.toLowerCase()),
				);
			}

			if (color !== "all") {
				tempProducts = tempProducts.filter((product) => {
					product.colors.find((col: any) => col === color);
				});
			}

			tempProducts = tempProducts.filter((product) => product.price <= price);

			if (shipping) {
				tempProducts = tempProducts.filter(
					(product) => product.shipping === shipping,
				);
			}

			return { ...state, filtered_products: tempProducts };
		}
		case UPDATE_FILTERS: {
			const { name, value } = action.payload;
			console.log({ ...state, filters: { ...state.filters, [name]: value } });
			return { ...state, filters: { ...state.filters, [name]: value } };
		}
		case CLEAR_FILTERS:
			return {
				...state,
				filters: {
					...initialState.filters,
					max_price: state.filters.max_price,
				},
			};
		default:
			throw Error("No action type found!");
	}
}

export const FilterContext = createContext<ContextProps>(initialContextState);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
	const {
		state: { products },
	} = useProductsContext();
	const [state, dispatch] = useReducer<Reducer<DataType, ActionType>>(
		reducer,
		initialState,
	);

	useEffect(() => {
		dispatch({ type: LOAD_PRODUCTS, payload: products });
	}, [products]);

	useEffect(() => {
		dispatch({ type: FILTER_PRODUCTS });
		dispatch({ type: SORT_PRODUCTS });
	}, [products, state.sort, state.filters]);

	function setGridView() {
		dispatch({ type: SET_GRIDVIEW });
	}
	function setListView() {
		dispatch({ type: SET_LISTVIEW });
	}

	const updateSort = (e: any) => {
		const value = e.target.value;
		dispatch({ type: UPDATE_SORT, payload: value });
	};

	const updateFilters = (e: any) => {
		let value = e.target.value;
		const name = e.target.name;

		if (name === "category") {
			value = e.target.textContent;
		}

		if (name === "color") {
			value = e.target.dataset.color;
		}

		if (name === "price") {
			value = Number(value);
		}

		if (name === "shipping") {
			value = e.target.checked;
		}

		console.log(name, value);

		dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
	};

	const clearFilters = () => {
		dispatch({ type: CLEAR_FILTERS });
	};

	return (
		<FilterContext.Provider
			value={{
				...state,
				setGridView,
				setListView,
				updateSort,
				updateFilters,
				clearFilters,
			}}
		>
			{children}
		</FilterContext.Provider>
	);
};

export function useFilterContext() {
	return useContext(FilterContext);
}
