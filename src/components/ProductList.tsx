import {useFilterContext} from "../context/FilterContext.tsx";
import {GridView, ListView} from "./index.ts";

const ProductList = () => {
    const {filtered_products: products, grid_view} = useFilterContext();

    if (products.length < 1) {
        return <h5>Sorry, no products match your search!</h5>;
    }

    if (!grid_view) {
        return <ListView products={products}/>;
    }

    return (
        <GridView products={products}/>
    );
};

export default ProductList;