import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";

import styled from 'styled-components';

import homeIcon from "../assets/home.svg";
import { useContext } from 'react';
import { ProductsContext } from '../context/ProductsContext';

type Props = {
  handleOpenSidebar: () => void;
}

function Navbar({ handleOpenSidebar }: Props) {
  const { openSidebar } = useContext(ProductsContext);

  return (
    <NavContainer>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/"><img src={homeIcon}></img></Link>
          {openSidebar ? <button type="button" className="nav-toggle" onClick={() => openSidebar()}><FaBars /></button> : null}
        </div>

        <ul className="nav-links">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/products">Products</Link></li>
        </ul>
      </div>

    </NavContainer>
  )
}

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }

  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    img {
      width: 50px;
      margin-left: -15px;
    }
  }

  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }

  .nav-links {
    display: none;
  }

  .cart-btn-wrapper {
    display: none;
  }

  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }

    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }

    .nav-links {
      display: flex;
      justify-content: center;

      li { margin: 0 0.5rem; }

      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;

        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }

    .cart-btn-wrapper {
      display: grid;
    }
  }
`;

export default Navbar