import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#0748A6"
        },
        secondary: {
            main: "#94C0FF"
        },
        dark: {
            main: "#333333",
            contrastText: "#f2f2f2"
        },
        light: {
            main: "#f2f2f2",
            contrastText: "#333333"
        },
        gray: {
            main: "#a3a3a3"
        },
    }
})

export const gradientCollection = {
    info: {
        main: "linear-gradient(to bottom right, #39C1FD, #18E7FE)"
    },
    gradientPurple: {
        main: "linear-gradient(to bottom right, #D7B7FF, #A078FF)"
    },
    danger: {
        main: "linear-gradient(to bottom right, #F46173, #F28579)"
    },
    warning: {
        main: "linear-gradient(to bottom right, #F57F28, #F6B44A)"
    },
}