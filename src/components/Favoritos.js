import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledFavoritos = styled.section`
  width: 100%;
  padding: 0;
  overflow: hidden;
  padding: 32px;
  background-color: ${({ theme }) => theme.backgroundBase};
  h2 {
    font-size: 16px;
    margin-bottom: 16px;
    text-transform: capitalize;
    color: ${({ theme }) => theme.textColorBase};
  }
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  div {
    width: calc(100vw - 16px * 4);
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(auto-fill, 150px);
    grid-auto-flow: column;
    grid-auto-columns: minmax(200px,1fr);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    a {
      scroll-snap-align: start;
      span {
        padding-top: 8px;
        display: block;
        padding-right: 24px;
        color: ${({ theme }) => theme.textColorBase};
      }
    }
  }
`

export default function Favoritos({ data }) {
  return (
    <StyledFavoritos>
      <h2>AluraTube Favoritos</h2>
      <div className="favoritos-div">
        {data?.map((favorito) => (
          <a key={favorito.id} href={favorito.html_url}>
            <img src={favorito.avatar_url} />
            <span>
              @{favorito.login}
            </span>
          </a>
        ))}
      </div>
    </StyledFavoritos>
  )
}
