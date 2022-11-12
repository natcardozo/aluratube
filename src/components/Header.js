import styled from "styled-components";

import Banner from "./Banner";

const StyledHeader = styled.div`
  section {
    background-color: ${({ theme }) => theme.backgroundLevel1};
    color: ${({ theme }) => theme.textColorBase}
  }
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

export default function Header({ imagem, name, job, github }) {
  return (
    <>
      <Banner imagem={imagem} />
      <StyledHeader>
        <section className="user">
          <img src={`https://github.com/${github}.png`} />
          <div>
            <h2>
              {name}
            </h2>
            <p>
              {job}
            </p>
          </div>
        </section>
      </StyledHeader>
    </>
  )
}