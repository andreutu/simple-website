import styled from 'styled-components';
import PageHero from '../components/PageHero';
import Filters from '../components/Filters';
import Sort from "../components/Sort.tsx";
import ProductList from "../components/ProductList.tsx";

function Products() {
    return (
        <main>
            <PageHero title="Products"/>
            <Wrapper className="page">
                <div className="section-enter products">
                    <Filters/>
                    <div>
                        <Sort/>
                        <ProductList/>
                    </div>
                </div>
            </Wrapper>
        </main>
    )
}

const Wrapper = styled.div`
    .products {
        display: grid;
        gap: 3rem 1.5rem;
        margin: 4rem auto;
    }

    @media (min-width: 768px) {
        .products {
            grid-template-columns: 200px 1fr;
        }
    }
`

export default Products