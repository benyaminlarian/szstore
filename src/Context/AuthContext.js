import { createContext } from "react";

const AuthContext = createContext({
    api : null,
    isLoggedIn: false,
    login: () => {},
    logout: () => {}
})


export default AuthContext