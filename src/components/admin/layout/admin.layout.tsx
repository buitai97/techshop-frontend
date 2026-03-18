import { useEffect, useRef, useState } from "react"
import { Outlet, useLocation } from "react-router"
import AdminHeader from "components/admin/layout/admin.header"
import { Spin } from "antd"
import AdminFooter from "components/admin/layout/admin.footer"
import { useAppContext } from "context/app.context"

const Layout = () => {
    const { isPageLoading } = useAppContext()
    const location = useLocation()
    const [isRouteLoading, setIsRouteLoading] = useState(false)
    const previousPathname = useRef(location.pathname)

    useEffect(() => {
        if (previousPathname.current === location.pathname) {
            return
        }

        previousPathname.current = location.pathname
        setIsRouteLoading(true)

        const timeout = window.setTimeout(() => {
            setIsRouteLoading(false)
        }, 450)

        return () => window.clearTimeout(timeout)
    }, [location.pathname])

    const shouldShowLoader = isPageLoading || isRouteLoading

    return (
        <>
            {isPageLoading === false ? (
                <>
                    <div className="page admin-page-shell">
                        <div className="app-header">
                            <AdminHeader />
                        </div>
                        <div className="app-content">
                            <Outlet />
                        </div>
                        <div className="app-footer">
                            <AdminFooter />
                        </div>

                        {shouldShowLoader && (
                            <div className="admin-route-loader">
                                <div className="admin-route-loader__card">
                                    <Spin size="large" />
                                    <p className="admin-route-loader__text">Loading admin page...</p>
                                </div>
                            </div>
                        )}
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

export default Layout
