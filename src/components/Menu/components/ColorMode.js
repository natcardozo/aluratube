import { createContext, useState } from "react"

export const ColorModeContext = createContext({
    mode: "light",
    setMode: () => {alert("Você precisa me configurar primeiro.")}
})

export default function ColorModeProvider({ children, initialMode }) {

    const [mode, setMode] = useState(initialMode)

    function toggleMode() {
        if (mode === "dark") {
            setMode("light")
            localStorage.setItem("USER_THEME", "light")
        }
        if (mode === "light") {
            setMode("dark")
            localStorage.setItem("USER_THEME", "dark")
        }
    }

    return (
        <ColorModeContext.Provider value={{ mode: mode, toggleMode: toggleMode }}>
            {children}
        </ColorModeContext.Provider>
    )
}