import { Outlet } from "react-router"
import { useEffect } from "react"
import { useAppContext } from "context/app.provider"
import { Spin } from "antd"
import ClientFooter from "./client.footer"
import ClientHeader from "./client.header"
import { fetchAccountAPI, fetchCartAPI } from "services/api"

const ClientLayout = () => {
    const { setCart, setUser, isPageLoading, setIsPageLoading, setIsAuthenticated, setCartSum } = useAppContext()
    useEffect(() => {
        const initUser = async () => {
            setIsPageLoading(true)
            const accessToken = localStorage.getItem("accessToken")
            if (accessToken) {
                const resUser = await fetchAccountAPI()
                const user = resUser?.data?.data?.user as IUser
                const resCart = await fetchCartAPI()
                const cart = resCart.data

                if (user) {
                    setUser({ id: user.id, username: user.username, name: user.name, email: user.email, avatar: user.avatar, role: user.role })
                    setIsAuthenticated(true)
                }
                if (cart) {
                    setCart(cart ?? {
                        items: [],
                        cartId: 0,
                        userId: 0
                    })
                    setCartSum(cart.cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0));
                }
            }
            setIsPageLoading(false)
        }
        initUser()
    }, [])
    return (
        <>
            {isPageLoading === false ? (
                <>
                    <div className="page">
                        <div className="app-header">
                            <ClientHeader />
                        </div>
                        <div className="app-content">
                            <Outlet />
                        </div>
                        <div className="app-footer">
                            <ClientFooter />
                        </div>
                    </div>

                </>

            ) :
                <div>
                    <Spin size="large" className="spin" />
                </div>
            }
        </>
    )
}

export default ClientLayout
