import { useState } from 'react';
import { HomeOutlined, ProductOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router';
import { useAppContext } from 'context/app.context';

type MenuItem = Required<MenuProps>['items'][number];


const AppHeader = () => {
    const { user, setUser, isAuthenticated, setIsAuthenticated } = useAppContext()
    const navigate = useNavigate()

    let items: MenuItem[] = [
        {
            label: <Link to="/admin">Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to="users">Users</Link>,
            key: 'users',
            icon: <UserOutlined />,
        },
        {
            label: <Link to="products">Product</Link>,
            key: 'products',
            icon: <ProductOutlined />,
        },
        {
            label: 'Profile',
            key: 'Profile',
            icon: <SettingOutlined />,
            children: [
                { label: `Hello, ${user?.name ?? " "}`, key: 'greeting', disabled: true },

                {
                    label: <span >Log Out</span>,
                    key: 'logout',
                    onClick: () => {
                        localStorage.removeItem("accessToken")
                        setUser({
                            id: 0, name: "", username: "",
                            email: '',
                            avatar: '',
                            role: {
                                id: 0,
                                name: '',
                                description: ''
                            }
                        })
                        setIsAuthenticated(false)
                        navigate("/login")
                    }
                },
            ],
        },
    ];
    if (!isAuthenticated) {
        items = [
            {
                label: <Link to="/">Home</Link>,
                key: 'home',
                icon: <HomeOutlined />,
            },
            {
                label: <Link to="/login" > Login </Link >,
                key: 'Login',
            },
        ];
    }


    const [current, setCurrent] = useState('home');

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default AppHeader;