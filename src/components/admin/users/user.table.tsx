import { deleteUserAPI, getUsersAPI } from "@/services/api"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Popconfirm, Space, Table, type TableProps } from "antd"
import { useEffect, useState } from "react"

const UserTable = () => {
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await getUsersAPI()
            setUsers(res.data.users)
        }
        fetchUsers()
    }, [])

    const columns: TableProps<IUser>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role) => <span>{role.name}</span>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">

                    <EditOutlined style={{ color: "orange", cursor: "pointer" }} />
                    <Popconfirm
                        title="Delete the user"
                        description="Are you sure to delete this user?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => {
                            deleteUserAPI(record.id)
                            setUsers(users.filter(user => user.id !== record.id))
                        }}
                    >
                        <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];


    return (
        <div style={{ margin: "10px" }}>
            <p className="text-2xl font-bold mb-4">User Table</p>
            <Table dataSource={users} columns={columns} rowKey="id" pagination={{ position: ["bottomCenter"] }} />;
        </div>
    )

}

export default UserTable