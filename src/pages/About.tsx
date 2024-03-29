import styled from 'styled-components';
import PageHero from '../components/PageHero';

import img1 from "../assets/home-image-1.jpg";

function About() {
  return (
    <main>
      <PageHero title="About" />
      <Wrapper className="page section section-center">
        <img src={img1} />
        <article>
          <div className="title">
            <h2>Our Story</h2>
            <div className="underline">
            </div>
          </div>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
            but also the leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </article>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;

  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }

  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }

  .title {
    text-align: left;
  }

  .underline {
    margin-left: 0;
  }

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export default About;