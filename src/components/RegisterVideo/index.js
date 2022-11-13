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

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: {
            titulo: "",
            url: ""
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

                    setFormVisivel(false)
                    formCadastro.clearForm()
                }}>
                    <div>
                        <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>x</button>
                        <input 
                            placeholder="Título do vídeo" 
                            name="titulo"
                            value={formCadastro.values.titulo} 
                            onChange={formCadastro.handleChange}
                        />
                        <input 
                            placeholder="URL" 
                            name="url"
                            value={formCadastro.values.url} 
                            onChange={formCadastro.handleChange}
                        />
                        <button type="submit">
                            Cadastrar
                        </button>
                    </div>
                </form>
            }
        </StyledRegisterVideo>
    )
}