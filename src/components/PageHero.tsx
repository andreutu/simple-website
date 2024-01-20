import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageHero = ({ title, product }: {title: string, product?: any}) => {
  return (
    <Wrapper>
      <div className="section-center">
        <h3><Link to="/" >Home</Link></h3>
        {product && <Link to="/products">Products</Link>} / {title}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background: var(--clr-primary-10);
  width: 100%;
  min-height: 20vh;
  display: flex;
  align-items: center;

  color: var(--clr-primary-1);

  a {
    color: var(--clr-primary-3);
    padding: 0.5rem;
    transition: var(--transition);
  }

  a:hover {
    color: var(--clr-primary-1);
  }
`;

export default PageHero