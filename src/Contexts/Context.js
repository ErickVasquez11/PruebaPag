import React, { useCallback, useMemo, useState, useEffect, } from "react";
import Services from "../Services/UserServices";

const UserContext = React.createContext();
const TOKEN_KEY = "token";

export const Provider = (props) => {
    const [Token, setToken] = useState(undefined);
    const [User, setUser] = useState(undefined);

    const GetAllTokens = (Token) => {
        localStorage.setItem(TOKEN_KEY, Token);
        setToken(Token);
    }

    useEffect(() => {
        const VerifyToken = async () => {
            const TheToken = getToken();

            if (TheToken) {
                const { username, role } =
                    await Services.verifyToken(TheToken);
                if (username && role) {
                    setUser({ username, role });
                    GetAllTokens(TheToken);
                }
            }
        }

        VerifyToken();
    }, [Token])

    const LOgin = useCallback((username, password) => {
        const login = async () => {
            let status = false;
            try {
                const { token: tokenQ } = await Services.loginAdmin(username, password);
                if (tokenQ) {
                    GetAllTokens(tokenQ);
                    status = true;
                }
            } catch (error) {
                console.error(error);
                console.error("Error in credentials");
            } finally {
                return status;
            }
        };

        return login();
    }, [])

    const Exit = useCallback(() => {
        setUser(undefined);
        GetAllTokens(undefined);
    }, [])

    const value = useMemo(() => ({
        token: Token,
        user: User,
        login: LOgin,
        Exit: Exit
    }), [Token, User, LOgin, Exit]);

    return <UserContext.Provider value={value} {...props} />;
}

export const useUserContext = () => {
    const contexts = React.useContext(UserContext);
    if (!contexts) {
        throw new Error("useUserContext() must be inside of UserProvider");
    }
    return contexts;
}

const getToken = () => localStorage.getItem(TOKEN_KEY);
