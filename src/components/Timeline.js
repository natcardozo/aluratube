import styled from "styled-components";
import Favoritos from "./Favoritos";

export const StyledTimeline = styled.div`
  flex: 1;
  width: 100%;
  padding: 16px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.backgroundBase};
  h2 {
    font-size: 16px;
    margin-bottom: 16px;
    text-transform: capitalize;
  }
  img {
    aspect-ratio: 16/9;
    font-weight: 500;
    object-fit: cover;
    width: 100%;
    max-width: 210px;
    height: auto;
  }
  section {
    width: 100%;
    padding: 0;
    overflow: hidden;
    padding: 16px;
    color: ${({ theme }) => theme.textColorBase};
    div {
      width: calc(100vw - 16px * 4);
      display: grid;
      grid-gap: 16px;
      grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
      grid-auto-flow: column;
      grid-auto-columns: minmax(200px,1fr);
      overflow-x: hidden;
      .link {
        scroll-snap-align: start;
        span {
          padding-top: 8px;
          display: block;
          padding-right: 24px;
          color: ${({ theme }) => theme.textColorBase};
        }
      }
      &:hover {
        overflow-x: auto;
        scroll-snap-type: x mandatory;
      }
      &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.borderBase};
        border-radius: 4px;
      }
    }
  }
`;

export default function Timeline({ data, playlists, valorDaBusca }) {
  const playlistNames = Object.keys(playlists)

  return (
    <>
      <StyledTimeline>
        {playlistNames.map((playlistName, id) => {
          const videos = playlists[playlistName];
          return (
            <section key={id}>
              <h2>{playlistName}</h2>
              <div>
                {videos.filter(
                  (video) => {
                    const titleNormalized = video.title.toLowerCase();
                    const valorDaBuscaNormalized = valorDaBusca.toLowerCase();
                    return titleNormalized.includes(valorDaBuscaNormalized)
                  }).map((video, idx) => {
                    return (
                      <a className="link" key={idx} href={`/video?${video.id}${playlistName}`}>
                        <img src={video.thumb} alt={video.title} />
                        <span>
                          {video.title}
                        </span>
                      </a>
                    )
                  }
                )}
              </div>
            </section>
          )
        })}
      </StyledTimeline>
      <Favoritos data={data} />
    </>
  )
}