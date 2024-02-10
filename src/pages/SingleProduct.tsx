import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useProductsContext } from "../context/ProductsContext.tsx";
import { single_product_url } from "../utils/constants.ts";
import Loading from "../components/Loading.tsx";
import { Error } from "./index.ts";
import styled from "styled-components";
import PageHero from "../components/PageHero.tsx";
import { Link } from "react-router-dom";
import { ProductImage } from "../components";
import AddToCart from "../components/AddToCart.tsx";

function SingleProduct() {
	const { id } = useParams();
	const navigate = useNavigate();
	const {
		fetchSingleProduct,
		state: { single_product, single_product_loading, single_product_error },
	} = useProductsContext();

	useEffect(() => {
		fetchSingleProduct(`${single_product_url}${id}`);
	}, [id]);

	if (single_product_loading) {
		return <Loading />;
	}

	if (single_product_error) {
		return <Error />;
	}

	const {
		id: sku,
		name,
		images,
		price,
		description,
		stock,
		stars,
		reviews,
		company,
	} = single_product;
	console.log(name);

	return (
		<Wrapper>
			<PageHero title={name} product={single_product} />

			<div className="section section-center page">
				<Link to="/products" className="btn">
					Back to Products
				</Link>

				<div className="product-center">
					<ProductImage images={images} />

					<section className="content">
						<h2>{name}</h2>
						<h5 className="price">{price}</h5>
						<p className="desc">{description}</p>
						<p className="info">
							<span>Available:</span> {stock > 0 ? "In Stock" : "Out of Stock"}
						</p>
						<p className="info">
							<span>SKU:</span>
							{sku}
						</p>
						<p className="info">
							<span>Brand:</span>
							{company}
						</p>

						<hr />

						{stock > 0 && <AddToCart product={single_product} />}
					</section>
				</div>
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.main`
	.product-center {
		display: grid;
		gap: 4rem;
		margin-top: 2rem;
	}

	.price {
		color: var(--clr-primary-5);
	}

	.desc {
		line-height: 2;
		max-width: 45em;
	}

	.info {
		text-transform: capitalize;
		width: 300px;
		display: grid;
		grid-template-columns: 125px 1fr;

		span {
			font-weight: 700;
		}
	}

	@media (min-width: 992px) {
		.product-center {
			grid-template-columns: 1fr 1fr;
			align-items: center;
		}

		.price {
			font-size: 1.25rem;
		}
	}
`;

export default SingleProduct;
