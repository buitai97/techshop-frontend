import AddProductModal from "@/modal/addProduct"
import { deleteProductAPI, getProductsAPI } from "@/services/api"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Space, Table, type TableProps } from "antd"
import { useEffect, useState } from "react"

const ProductTable = () => {
    const [data, setData] = useState<{ count: number, products: IProduct[], pageSize: number }>()
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [showAddProductModal, setShowAddProductModal] = useState<boolean>(false)

    const fetchProducts = async () => {
        const res = await getProductsAPI(currentPage, 5, false)
        setData(res.data)
    }
    useEffect(() => {

        fetchProducts()
    }, [currentPage])

    const handleAddProduct = () => {
        // open modal to add product
        setShowAddProductModal(true);
    };

    const closeAddProductModal = () => {
        setShowAddProductModal(false);
    }

    const handleDeleteProduct = async (id: number) => {
        await deleteProductAPI(id);
        await fetchProducts();
    }

    const columns: TableProps<IProduct>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Product',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record, __) => (
                <Space size="middle">
                    <EditOutlined style={{ color: "orange", cursor: "pointer" }} />
                    <DeleteOutlined style={{ color: "red", cursor: "pointer" }} onClick={() => { handleDeleteProduct(record.id) }} />
                </Space>
            ),
        },
    ];


    return (
        <div style={{ margin: "10px" }}>
            <p className="text-2xl font-bold mb-4">Product Table</p>
            <Button type="primary" className="mb-4" onClick={() => { handleAddProduct() }}    > + Add Product</Button>
            <AddProductModal
                open={showAddProductModal}
                handleOk={closeAddProductModal}
                handleCancel={closeAddProductModal}
            />
            <Table
                dataSource={data?.products}
                columns={columns}
                rowKey="id"
                pagination={{
                    position: ["bottomCenter"],
                    total: data?.count,
                    current: currentPage,
                    onChange: (pageNumber) => {
                        setCurrentPage(pageNumber)
                    }
                }} />

        </div>
    )

}



export default ProductTable