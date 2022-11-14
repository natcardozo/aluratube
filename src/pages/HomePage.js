import { useEffect, useState } from "react";

import config from "../config.json";

import Menu from "../components/Menu";
import Timeline from "../components/Timeline";
import Header from "../components/Header";
import { videoService } from "../services/videoService";

function HomePage() {
  const service = videoService();

  const [valorDaBusca, setValorDaBusca] = useState("");
  const [playlists, setPlaylists] = useState({});
  const [data, setData] = useState(null);

  useEffect(() => {
    service
      .getAllVideos()
      .then((res) => {
        const novasPlaylists = {...playlists}
        res.data.forEach((video) => {
          if(!novasPlaylists[video.playlist]) {
            novasPlaylists[video.playlist] = [];
          }
          novasPlaylists[video.playlist].push(video)
        })
        setPlaylists(novasPlaylists)
    });
  }, []) // eslint-disable-line

  console.log(playlists)

  useEffect(() => {
    fetch("https://api.github.com/users/natcardozo/following")
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw response
      })
      .then(data => {
        setData(data)
      })
      .catch(error => {
        console.error("Error fetching data: " + error)
      })
  }, [])

  return (
    <>
      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}>
        <Menu valorDaBusca={valorDaBusca} setValorDaBusca={setValorDaBusca} />
        <Header imagem={config.banner} name={config.name} job={config.job} github={config.github} />
        <Timeline data={data} valorDaBusca={valorDaBusca} playlists={playlists} />
      </div>
    </>
  )
}

export default HomePage