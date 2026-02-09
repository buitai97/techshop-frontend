import { useAppContext } from "context/app.context";
import { fetchAccountAPI } from "services/api";
import { Button, Result, Spin } from "antd";
import { useEffect } from "react";
import { Link, Outlet } from "react-router";

const ProtectedRoute = () => {
    const { setUser, isAuthenticated, user, isPageLoading, setIsPageLoading, setIsAuthenticated } = useAppContext()
    useEffect(() => {
        const initUser = async () => {
            setIsPageLoading(true)
            const accessToken = localStorage.getItem("accessToken")
            if (accessToken) {
                const res = await fetchAccountAPI()
                const user = res?.data?.data?.user
                if (user) {
                    setUser({ id: user.id, username: user.username, name: user.name, email: user.email, avatar: user.avatar, role: user.role })
                    setIsAuthenticated(true)
                }
            }
            setIsPageLoading(false)
        }
        initUser()
    }, [setIsAuthenticated, setUser, setIsPageLoading])
    const isAdminRoute = location.pathname.includes("admin")

    if (isPageLoading) {
        return <Spin size="large" className="spin" />
    }

    if (!isAuthenticated) {
        return (<Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary"><Link to="/">Back Home</Link></Button>}
        />)
    }
    else if (isAdminRoute && user?.role.name !== 'ADMIN') {
        return (<Result
            status="403"
            title="Not Login"
            subTitle="Please sign in to access this feature"
            extra={<Button type="primary"><Link to="/">Back Home</Link></Button>}
        />)
    }

    return <Outlet />;
}
export default ProtectedRoute;