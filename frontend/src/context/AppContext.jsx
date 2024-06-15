import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const router = useRouter();

    const [currentUser, setCurrentUser] = useState(JSON.parse(typeof window !== 'undefined' ? sessionStorage.getItem('user') : null));

    const [loggedIn, setLoggedIn] = useState(currentUser !== null);

    const logout = () => {
        if (typeof window !== 'undefined')
        sessionStorage.removeItem('user');
        setCurrentUser(null);
        setLoggedIn(false);
        // clear cookie
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        router.push('/authenticate');
    }

    return (
        <AppContext.Provider value={{
            currentUser,
            setCurrentUser,
            loggedIn,
            setLoggedIn,
            logout
        }}>
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => useContext(AppContext);

export default useAppContext;