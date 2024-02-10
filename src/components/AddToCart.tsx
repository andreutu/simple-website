import { useState } from "react";
import { useCartContext } from "../context/CartContext.tsx";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import AmountButtons from "./AmountButtons.tsx";
import { Link } from "react-router-dom";

function AddToCart({ product }) {
	const { addToCart } = useCartContext();
	const { id, stock, colors, price } = product;

	const [mainColor, setMainColor] = useState<string>(colors[0]);
	const [amount, setAmount] = useState<number>(1);

	function increase() {
		setAmount((oldAmount) => {
			let tempAmount = oldAmount + 1;

			if (tempAmount > stock) {
				tempAmount = stock;
			}

			return tempAmount;
		});
	}

	function decrease() {
		setAmount((oldAmount) => {
			let tempAmount = oldAmount - 1;

			if (tempAmount < 1) {
				tempAmount = 1;
			}

			return tempAmount;
		});
	}

	return (
		<Wrapper>
			<div className="colors">
				<span>Colors: </span>
				<div>
					{colors.map((color, index) => {
						<button
							className={`${mainColor === color ? "color-btn active" : "color-btn"}`}
							key={index}
							style={{ background: color }}
							onClick={() => setMainColor(color)}
						>
							{mainColor === color ? <FaCheck /> : null}
						</button>;
					})}
				</div>
			</div>
			<div className="btn-container">
				<AmountButtons
					amount={amount}
					increase={increase}
					decrease={decrease}
				/>
				<Link
					to="/cart"
					className="btn"
					onClick={() => addToCart(id, mainColor, amount, product)}
				>
					Add to Cart
				</Link>
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.section`
	margin-top: 2rem;

	.colors {
		display: grid;
		grid-template-columns: 125px 1fr;
		align-items: center;
		margin-bottom: 1rem;

		span {
			text-transform: capitalize;
			font-weight: 700;
		}

		div {
			display: flex;
		}
	}

	.color-btn {
		display: inline-block;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		background: #222;
		margin-right: 0.5rem;
		border: none;
		cursor: pointer;
		opacity: 0.5;
		display: flex;
		align-items: center;
		justify-content: center;

		svg {
			font-size: 0.75rem;
			color: var(--clr-white);
		}
	}

	.active {
		opacity: 1;
	}

	.btn-container {
		margin-top: 2rem;
	}

	.btn {
		margin-top: 1rem;
		width: 140px;
	}
`;

export default AddToCart;
