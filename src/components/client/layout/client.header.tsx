import { MenuOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Layout, Space, type MenuProps } from "antd";
import { useAppContext } from "@/context/app.provider";
import { Link, useNavigate } from "react-router";

const { Header } = Layout;


const ClientHeader = () => {
    const { user, setUser, setIsAuthenticated, cartSum } = useAppContext()

    const navigate = useNavigate()
    const handleLogout = async () => {
        setUser(null);
        setIsAuthenticated(false)
        localStorage.removeItem('accessToken')
        navigate("/login")
    }

    const items: MenuProps['items'] = [
        {
            label: (
                <a href="/" rel="noopener noreferrer">
                    Home
                </a>
            ),
            key: '1',
        },
        {
            label: (
                <a href="/products" rel="noopener noreferrer">
                    Products
                </a>
            ),
            key: '2',
        }
        ,
        {
            label: (
                <a onClick={handleLogout} rel="noopener noreferrer">
                    Log Out
                </a>
            ),
            key: '3',
        }
        ,
    ];

    return (
        <Header className="flex !items-center !justify-between !bg-white shadow md:!py-10 ">
            <div className="text-xl md:text-3xl font-bold text-cyan-900 cursor-pointer" onClick={() => { navigate("/") }}>Tech Store</div>
            <div className="md:text-2xl flex gap-6 ">
                <div className="">
                    <Link to="/" className="!text-gray-500">Home</Link>
                    <Link to="/products" className="p-5 !text-gray-500">Products</Link>
                </div>
            </div>


            {user ? (
                <div className="flex">
                    <div className="mr-5">
                        <Badge count={cartSum} size="small">
                            <ShoppingCartOutlined className="text-xl cursor-pointer" />
                        </Badge>
                    </div>
                    <Dropdown
                        menu={{ items }}
                        trigger={['click']}
                        className="cursor-pointer text-2xl"
                    >
                        <Space>
                            <MenuOutlined />
                        </Space>
                    </Dropdown>
                </div>

            ) :
                <Link className="text-xl !text-gray-500" to="/login">Login</Link>
            }
        </Header>
    )

};
export default ClientHeader