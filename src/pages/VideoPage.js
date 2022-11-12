import Menu from "../components/Menu";
import config from "../config.json";
import styled from "styled-components";

const StyledVideoPage = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: space-around;
    width: 100vw;
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
    }
`

export default function VideoPage() {
    const id = window.location.search.replace(/\D/g, "");
    const playlist = window.location.search.replace(id, "").replace("?", "")

    const itemPlaylist = config.playlists[playlist]
    const item = itemPlaylist.find(item => item.id === String(id))
    
    return (
        <>
            <Menu />
            <StyledVideoPage>
                <section style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                }}>
                    <iframe src={item.youtube_url}></iframe>
                    <h2>{item.title}</h2>
                    <span>{item.release_date}</span>
                </section>
                <div>
                    {itemPlaylist.filter(relItem => relItem.id !== id).map((rel) => (
                        <a key={rel.id} className="link" href={`/video?${rel.id}${playlist}`}>
                            <img src={rel.thumb} />
                            <span>{rel.title}</span>
                        </a>
                    ))}
                    Lista de vídeos
                </div>
            </StyledVideoPage>
        </>
    )
}