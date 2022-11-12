import styled from "styled-components";

const StyledBanner = styled.div`
    margin-top: 50px;
    width: 100%;
    height: 230px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

export default function Banner({ imagem }) {
    return (
        <StyledBanner>
            <img src={imagem} alt="Banner" />
        </StyledBanner>
    )
}