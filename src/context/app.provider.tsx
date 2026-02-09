import {  useState } from "react";
import { AppContext } from "./app.context";

interface IProps {
    children: React.ReactNode
}

const AppProvider = ({children}: IProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [user, setUser] = useState<IUser | null>(null)
    const [isPageLoading, setIsPageLoading] = useState<boolean>(false)
    const [cart, setCart] = useState<ICart | null>(null)
    const [cartSum, setCartSum] = useState<number>(0)
    return (
        <AppContext.Provider value={{
            user,
            setUser,
            isPageLoading,
            setIsPageLoading,
            isAuthenticated,
            setIsAuthenticated,
            cart,
            setCart,
            cartSum,
            setCartSum
        }}>
            {children}
        </AppContext.Provider>
    )
}


export default AppProvider