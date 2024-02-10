import PageHero from "../components/PageHero.tsx";
import styled from "styled-components";
import CartContent from "../components/CartContent.tsx";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext.tsx";

function CartPage() {
	const {
		state: { cart },
	} = useCartContext();

	if (cart.length < 1) {
		return (
			<Wrapper className="page-100">
				<div className="empty">
					<h2>Your cart is empty!</h2>
					<Link to={"/products"} className="btn">
						Fill It!
					</Link>
				</div>
			</Wrapper>
		);
	}
	return (
		<main>
			<PageHero title="CartPage" />

			<Wrapper className="page">
				<CartContent />
			</Wrapper>
		</main>
	);
}

const Wrapper = styled.main`
	.empty {
		text-align: center;

		h2 {
			margin-bottom: 1rem;
			text-transform: none;
		}
	}
`;

export default CartPage;
