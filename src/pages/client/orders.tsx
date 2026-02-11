import { useEffect, useState } from 'react';
import { Table, Card } from 'antd';
import { getOrdersByUserAPI } from 'services/api';

export default function OrdersPage() {

    const [ordersData, setOrdersData] = useState<IOrder[]>([]);


    useEffect(() => {
        const fetchOrders = async () => {
            const res = await getOrdersByUserAPI();
            setOrdersData(res.data)
        }
        fetchOrders()
    }, [])

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
            render: (text: string) => <span className="font-semibold text-blue-600">{text}</span>
        },
        {
            title: 'Customer',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            sorter: (a: IOrder, b: IOrder) => new Date(a.date).getTime() - new Date(b.date).getTime()
        },
        {
            title: 'Total',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            sorter: (a: IOrder, b: IOrder) => a.totalPrice - b.totalPrice,
            render: (total: number) => <span className="font-semibold">${total.toFixed(2)}</span>
        },
    ];



    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders Management</h1>
                    <p className="text-gray-600">View and manage all customer orders</p>
                </div>

                <Card>
                    <Table
                        columns={columns}
                        dataSource={ordersData}
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showTotal: (total) => `Total ${total} orders`
                        }}
                        rowKey="id"
                    />
                </Card>

                {/* <Drawer
                    title={selectedOrder ? `Order Details - ${selectedOrder.orderId}` : 'Order Details'}
                    placement="right"
                    width={640}
                    onClose={() => setDrawerVisible(false)}
                    open={drawerVisible}
                >
                    {selectedOrder && (
                        <div className="space-y-6">
                            <div>
                                <Badge
                                    status={selectedOrder.status === 'delivered' ? 'success' : 'processing'}
                                    text={<span className="text-lg font-semibold">{getStatusText(selectedOrder.status)}</span>}
                                />
                            </div>

                            <Descriptions title="Customer Information" column={1} bordered>
                                <Descriptions.Item label="Name">{selectedOrder.customer}</Descriptions.Item>
                                <Descriptions.Item label="Email">{selectedOrder.email}</Descriptions.Item>
                                <Descriptions.Item label="Shipping Address">{selectedOrder.shippingAddress}</Descriptions.Item>
                            </Descriptions>

                            <Descriptions title="Order Information" column={1} bordered>
                                <Descriptions.Item label="Order ID">{selectedOrder.orderId}</Descriptions.Item>
                                <Descriptions.Item label="Order Date">{selectedOrder.date}</Descriptions.Item>
                                <Descriptions.Item label="Payment Method">{selectedOrder.paymentMethod}</Descriptions.Item>
                            </Descriptions>

                            <div>
                                <h3 className="text-lg font-semibold mb-3">Order Items</h3>
                                <div className="space-y-3">
                                    {selectedOrder.items.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                            <div className="flex-1">
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                            </div>
                                            <p className="font-semibold">${item.price.toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                                    <span className="text-lg font-bold">Total</span>
                                    <span className="text-lg font-bold text-blue-600">${selectedOrder.total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3">Order Timeline</h3>
                                <Timeline
                                    items={[
                                        {
                                            color: 'green',
                                            children: (
                                                <>
                                                    <p className="font-medium">Order Placed</p>
                                                    <p className="text-sm text-gray-600">{selectedOrder.date}</p>
                                                </>
                                            )
                                        },
                                        {
                                            color: selectedOrder.status !== 'pending' ? 'green' : 'gray',
                                            children: (
                                                <>
                                                    <p className="font-medium">Processing</p>
                                                    <p className="text-sm text-gray-600">Order is being prepared</p>
                                                </>
                                            )
                                        },
                                        {
                                            color: selectedOrder.status === 'shipped' || selectedOrder.status === 'delivered' ? 'green' : 'gray',
                                            children: (
                                                <>
                                                    <p className="font-medium">Shipped</p>
                                                    <p className="text-sm text-gray-600">Order has been shipped</p>
                                                </>
                                            )
                                        },
                                        {
                                            color: selectedOrder.status === 'delivered' ? 'green' : 'gray',
                                            children: (
                                                <>
                                                    <p className="font-medium">Delivered</p>
                                                    <p className="text-sm text-gray-600">Order has been delivered</p>
                                                </>
                                            )
                                        }
                                    ]}
                                />
                            </div>

                            <div className="flex gap-3">
                                <Button type="primary" block size="large">
                                    Update Status
                                </Button>
                                <Button block size="large" icon={<PrinterOutlined />}>
                                    Print Invoice
                                </Button>
                            </div>
                        </div>
                    )}
                </Drawer> */}
            </div>
        </div>
    );
}