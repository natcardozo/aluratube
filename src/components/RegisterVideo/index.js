import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { StyledRegisterVideo } from "./styles";

function useForm(props) {
    const [values, setValues] = useState(props.initialValues)
    return {
        values,
        handleChange: (e) => {
            const value = e.target.value;
            const name = e.target.name;
            setValues({
                ...values,
                [name]: value
            })
        },
        clearForm() {
            setValues({})
        }
    }
}

const PROJECT_URL = "https://ricllmcxzquhzivpglvg.supabase.co";
const PROJECT_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpY2xsbWN4enF1aHppdnBnbHZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNzcyMzMsImV4cCI6MTk4Mzk1MzIzM30.6qlS6FIzHH8ZKBfLOZRjsP05HnUz2EdVLZ-h6XFUc8M";
const supabase = createClient(PROJECT_URL, PROJECT_KEY);

const getThumbnail = (url) => {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: {
            titulo: "",
            url: "",
            playlist: "gerais"
        }
    });
    const [formVisivel, setFormVisivel] = useState(false);

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>+</button>
            {formVisivel && // && operador de curto-circuito
                <form onSubmit={(e) => {
                    e.preventDefault()
                    console.log(formCadastro.values)
                    supabase.from("videos").insert({
                        name: formCadastro.values.titulo,
                        url: formCadastro.values.url,
                        thumb: getThumbnail(formCadastro.values.url),
                        playlist: formCadastro.values.playlist
                    })
                    .then((res) => {
                        console.log(res.data)
                    })
                    .catch((err) => {
                        console.error(err)
                    })

                    setFormVisivel(false)
                    formCadastro.clearForm()
                }}>
                    <div>
                        <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>&#128473;</button>
                        <input 
                            placeholder="Título do vídeo" 
                            name="titulo"
                            value={formCadastro.values.titulo} 
                            onChange={formCadastro.handleChange}
                            minLength={3}
                        />
                        <input 
                            placeholder="Youtube URL" 
                            name="url"
                            value={formCadastro.values.url} 
                            onChange={formCadastro.handleChange}
                            pattern="^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$"
                        />
                        <select onChange={formCadastro.handleChange} defaultValue="gerais">
                            <option value="gerais">Gerais</option>
                            <option value="jogos">Jogos</option>
                            <option value="musica">Música</option>
                        </select>
                        <button type="submit">
                            Cadastrar
                        </button>
                    </div>
                </form>
            }
        </StyledRegisterVideo>
    )
}