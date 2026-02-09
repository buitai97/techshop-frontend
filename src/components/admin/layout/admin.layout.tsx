import { Outlet } from "react-router"
import AdminHeader from "components/admin/layout/admin.header"
import { Spin } from "antd"
import AdminFooter from "components/admin/layout/admin.footer"
import { useAppContext } from "context/app.provider"

const Layout = () => {
    const { isPageLoading } = useAppContext()
    return (
        <>
            {isPageLoading === false ? (
                <>
                    <div className="page">
                        <div className="app-header">
                            <AdminHeader />
                        </div>
                        <div className="app-content">
                            <Outlet />
                        </div>
                        <div className="app-footer">
                            <AdminFooter />
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

export default Layout
