import Menu from "../components/Menu";
import styled from "styled-components";
import { videoService } from "../services/videoService";
import { useEffect, useState } from "react";

const StyledVideoPage = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: space-around;
    width: 100vw;
    @media screen and (max-width: 800px) {
        flex-direction: column;
    }
    section {
        width: 75%;
        padding: 56px 150px;
        iframe {
            width: 100%;
            max-width: 1060px;
            height: 85%;
            max-height: 550px;
        }
        h2 {
            margin-top: 24px;
        }
        span {
            margin-top: 8px;
        }
        @media screen and (max-width: 800px) {
            width: 100%;
            padding: 56px 0;
            iframe {
                height: 450px;
            }
        }
        @media screen and (max-width: 480px) {
            iframe {
                height: 250px;
            }
        }
    }
    div {
        width: 25%;
        height: 100%;
        max-height: calc(100vh - 50px);
        background-color: ${({ theme }) => theme.backgroundLevel2};
        overflow: auto;
        padding: 56px 56px;
        .link {
            width: 100%;
            img {
                width: 100%;
            }
            span {
                padding-top: 8px;
                padding-bottom: 8px;
                display: block;
                padding-right: 24px;
                color: ${({ theme }) => theme.textColorBase};
            }
        }
        @media screen and (max-width: 780px) {
            width: 100%;
        }
    }
`

//format date and time from created_at
const formatDateTime = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    return `Enviado ${day}/${month}/${year} às ${hours}:${minutes}`;
}

//get embed url from youtube url
const getEmbedUrl = (url) => {
    const videoId = url?.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
};

export default function VideoPage() {
    const service = videoService();
    const id = parseInt(window.location.search.replace(/\D/g, ""));

    const [item, setItem] = useState({})
    const [recomendados, setRecomendados] = useState([])
    
    useEffect(() => {
        service.getAllVideos()
        .then((res) => {
            setItem(res.data.find(item => item.id === id))
            setRecomendados(res.data)
        })
    }, []) // eslint-disable-line

    return (
        <>
            <Menu />
            <StyledVideoPage>
                <section style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                }}>
                    <iframe src={getEmbedUrl(item.url)} title={item.name}></iframe>
                    <h2>{item.name}</h2>
                    <span>{formatDateTime(item.created_at)}</span>
                </section>
                <div>
                    <h3 style={{marginBottom: "16px"}}>Vídeos relacionados</h3>
                    {recomendados.filter(recomendado => recomendado.id !== id).map((rel) => (
                        <a key={rel.id} className="link" href={`/video?${rel.id}${rel.playlist}`}>
                            <img src={rel.thumb} alt={rel.name} />
                            <span>{rel.name}</span>
                        </a>
                    ))}
                </div>
            </StyledVideoPage>
        </>
    )
}