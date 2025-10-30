import { useState } from 'react';
import { Form, Input, Button, Radio, Divider, Space, Card, message } from 'antd';
import { CreditCardOutlined, LockOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useAppContext } from '@/context/app.provider';

const CheckoutPage = () => {
    const [form] = Form.useForm();
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [loading, setLoading] = useState(false);
    const { cart } = useAppContext();

    const cartItems: ICartItem[] = cart?.cartItems || [];

    const subtotal = cart?.cartItems.reduce((sum: number, item: ICartItem) => sum + (item.product.price * item.quantity), 0) || 0;
    const tax = subtotal * 0.08;
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + tax + shipping;

    const handleSubmit = (values: any) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            message.success('Order placed successfully!');
            console.log('Order details:', values);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
                    <p className="text-gray-600">Complete your purchase</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Forms */}
                    <div className="lg:col-span-2">
                        <Card className="mb-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <ShoppingCartOutlined />
                                Shipping Information
                            </h2>
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={handleSubmit}
                                initialValues={{ paymentMethod: 'card' }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Form.Item
                                        name="firstName"
                                        label="First Name"
                                        rules={[{ required: true, message: 'Please enter your first name' }]}
                                    >
                                        <Input placeholder="John" size="large" />
                                    </Form.Item>
                                    <Form.Item
                                        name="lastName"
                                        label="Last Name"
                                        rules={[{ required: true, message: 'Please enter your last name' }]}
                                    >
                                        <Input placeholder="Doe" size="large" />
                                    </Form.Item>
                                </div>

                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        { required: true, message: 'Please enter your email' },
                                        { type: 'email', message: 'Please enter a valid email' }
                                    ]}
                                >
                                    <Input placeholder="john.doe@example.com" size="large" />
                                </Form.Item>

                                <Form.Item
                                    name="address"
                                    label="Street Address"
                                    rules={[{ required: true, message: 'Please enter your address' }]}
                                >
                                    <Input placeholder="123 Main Street" size="large" />
                                </Form.Item>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Form.Item
                                        name="city"
                                        label="City"
                                        rules={[{ required: true, message: 'Required' }]}
                                    >
                                        <Input placeholder="New York" size="large" />
                                    </Form.Item>
                                    <Form.Item
                                        name="state"
                                        label="State"
                                        rules={[{ required: true, message: 'Required' }]}
                                    >
                                        <Input placeholder="NY" size="large" />
                                    </Form.Item>
                                    <Form.Item
                                        name="zipCode"
                                        label="ZIP Code"
                                        rules={[{ required: true, message: 'Required' }]}
                                    >
                                        <Input placeholder="10001" size="large" />
                                    </Form.Item>
                                </div>

                                <Divider />

                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <CreditCardOutlined />
                                    Payment Method
                                </h2>

                                <Form.Item name="paymentMethod">
                                    <Radio.Group onChange={(e) => setPaymentMethod(e.target.value)} className="w-full">
                                        <Space direction="vertical" className="w-full">
                                            <Radio value="card" className="w-full p-3 rounded hover:border-blue-400 transition-colors">
                                                <span className="font-medium">Credit Card</span>
                                            </Radio>
                                            <Radio value="paypal" className="w-full p-3 rounded hover:border-blue-400 transition-colors">
                                                <span className="font-medium">PayPal</span>
                                            </Radio>
                                        </Space>
                                    </Radio.Group>
                                </Form.Item>

                                {paymentMethod === 'card' && (
                                    <div className="mt-4 p-4 bg-gray-50 rounded">
                                        <Form.Item
                                            name="cardNumber"
                                            label="Card Number"
                                            rules={[{ required: true, message: 'Please enter your card number' }]}
                                        >
                                            <Input
                                                placeholder="1234 5678 9012 3456"
                                                size="large"
                                                prefix={<CreditCardOutlined />}
                                                maxLength={19}
                                            />
                                        </Form.Item>

                                        <div className="grid grid-cols-2 gap-4">
                                            <Form.Item
                                                name="expiry"
                                                label="Expiry Date"
                                                rules={[{ required: true, message: 'Required' }]}
                                            >
                                                <Input placeholder="MM/YY" size="large" maxLength={5} />
                                            </Form.Item>
                                            <Form.Item
                                                name="cvv"
                                                label="CVV"
                                                rules={[{ required: true, message: 'Required' }]}
                                            >
                                                <Input
                                                    placeholder="123"
                                                    size="large"
                                                    maxLength={4}
                                                    prefix={<LockOutlined />}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                )}

                                <Form.Item className="mt-6 mb-0">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        loading={loading}
                                        className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base font-semibold"
                                    >
                                        Place Order - ${total.toFixed(2)}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-8">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                            <div className="space-y-4 mb-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between items-start py-2 border-b">
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">{item.product.name}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold text-gray-900">
                                            ${(item.product.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <Divider className="my-4" />

                            <div className="space-y-2">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>

                                <Divider className="my-3" />

                                <div className="flex justify-between text-lg font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded">
                                <p className="text-sm text-green-800 text-center">
                                    🔒 Secure checkout powered by SSL encryption
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;