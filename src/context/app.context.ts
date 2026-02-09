import { createContext, useContext } from "react";

export const AppContext = createContext<IAppData | null>(null)
export const useAppContext = () => {
    const object = useContext(AppContext);
    if (!object) { throw new Error("useAppContext must be used within a Provider") }
    return object;
}
