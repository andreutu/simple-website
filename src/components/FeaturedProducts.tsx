import styled from 'styled-components';
import Product from './Product';
import { Link } from 'react-router-dom';
import { useProductsContext } from '../context/ProductsContext';
import Error from './Error';
import Loading from './Loading';

function FeaturedProducts() {
  const { state: { products_loading: loading, products_error: error, products: products } } = useProductsContext();
  
  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  return (
    <Wrapper className="section">
      <div className="title">
        <h2>Featured Products</h2>
        <div className="underline"></div>
      </div>

      <div className="section-center featured">
        {products.map((product) => {
          const { id, name, price, image } = product;
          return <Product id={id} key={id} price={price} name={name} image={image} />
        })}
      </div>

      <Link className="btn" to="/products">All Products</Link>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background: var(--clr-grey-10);

  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }

  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }

  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`

export default FeaturedProducts