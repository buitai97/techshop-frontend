import { useAppContext } from "context/app.context";
import { fetchCartAPI, updateCartItemAPI } from "services/api";
import { ArrowLeftOutlined, DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Empty, InputNumber, Spin, Tag } from "antd"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const CartPage = () => {
    const { setCartSum } = useAppContext();
    const [cart, setCart] = useState<ICart | null>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {

        const fetchCartItems = async () => {
            setLoading(true)
            const response = await fetchCartAPI();
            setCart(response.data);
            setLoading(false);
        };
        fetchCartItems();
    }, []);

    const updateQuantity = async (id: number, quantity: number) => {
        if (quantity < 1) return

        setCart((prev: ICart | null) => {
            if (!prev) return null;
            return {
                ...prev,
                cartItems: prev.cartItems.map(item => item.id === id ? { ...item, quantity } : item)
            };
        });

        await updateCartItemAPI(id, quantity);

        setCartSum((prev: number) => {
            if (!cart) return prev;
            const item = cart.cartItems.find(item => item.id === id);
            if (!item) return prev;
            return prev - item.quantity + quantity;
        });
    };

    const removeItem = async (id: number) => {
        setCart((prev: ICart | null) => {
            if (!prev) return null;
            return {
                ...prev,
                cartItems: prev.cartItems.filter(item => item.id !== id)
            };
        });
        setCartSum((prev: number) => {
            if (!cart) return prev;
            const item = cart.cartItems.find(item => item.id === id);
            if (!item) return prev;
            return prev - item.quantity;
        });
        await updateCartItemAPI(id, 0);
    };

    const subtotal = cart?.cartItems.reduce((sum: number, item: ICartItem) => sum + (item.product.price * item.quantity), 0) || 0;
    const tax = subtotal * 0.08;
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + tax + shipping;

    if (loading)
        return (
            <div className="flex items-center justify-center h-100">
                <Spin indicator={<LoadingOutlined spin />} size="large"></Spin>
            </div>);

    else {
        return (
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                            </div>
                            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/products")} type="text">
                                Continue Shopping
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {cart?.cartItems?.length === 0 || !cart ? (
                        <Card className="text-center">
                            <Empty
                                description="Your cart is empty"
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            >
                                <Button type="primary" size="large" onClick={() => { navigate("/products") }}>
                                    Start Shopping
                                </Button>
                            </Empty>
                        </Card>
                    )
                        :
                        (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Cart Items */}
                                <div className="lg:col-span-2 space-y-4">
                                    {cart?.cartItems.map((item) => (
                                        <Card key={item.id} className="hover:shadow-md transition-shadow">
                                            <div className="flex flex-col sm:flex-row gap-4">
                                                {/* Product Image */}
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={`https://${import.meta.env.VITE_S3_BUCKET_NAME}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${item.product.imageKey}`}
                                                        alt={item.product.name}
                                                        className="w-full sm:w-32 h-32 object-cover rounded-lg"
                                                    />
                                                </div>

                                                {/* Product Details */}
                                                <div className="flex-1 flex flex-col sm:flex-row justify-between">
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                            {item.product.name}
                                                        </h3>
                                                        {item.product.quantity ? (
                                                            <Tag color="green">In Stock</Tag>
                                                        ) : (
                                                            <Tag color="red">Out of Stock</Tag>
                                                        )}
                                                        <div className="mt-3 flex items-center space-x-2">
                                                            <span className="text-sm text-gray-600">Quantity:</span>
                                                            <InputNumber
                                                                min={1}
                                                                max={10}
                                                                value={item.quantity}
                                                                onChange={(value: number | null) => updateQuantity(item.id, value ?? 0)}
                                                                className="w-24"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Price & Actions */}
                                                    <div className="flex flex-row sm:flex-col items-start sm:items-end justify-between sm:justify-start mt-4 sm:mt-0">
                                                        <div className="text-right">
                                                            <div className="text-2xl font-bold text-blue-600">
                                                                ${(item.product.price * item.quantity).toFixed(2)}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                ${item.product.price.toFixed(2)} each
                                                            </div>
                                                        </div>
                                                        <Button
                                                            type="text"
                                                            danger
                                                            icon={<DeleteOutlined />}
                                                            onClick={() => removeItem(item.id)}
                                                            className="mt-0 sm:mt-4"
                                                        >
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>

                                {/* Order Summary */}
                                <div className="lg:col-span-1">
                                    <Card title="Order Summary" className="sticky top-4">
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-gray-600">
                                                <span>Subtotal</span>
                                                <span>${subtotal.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-gray-600">
                                                <span>Tax (8%)</span>
                                                <span>${tax.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-gray-600">
                                                <span>Shipping</span>
                                                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                                            </div>
                                            {subtotal < 100 && (
                                                <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
                                                    Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                                                </div>
                                            )}
                                            <Divider className="my-3" />
                                            <div className="flex justify-between text-lg font-bold">
                                                <span>Total</span>
                                                <span className="text-blue-600">${total.toFixed(2)}</span>
                                            </div>
                                        </div>

                                        <Button
                                            type="primary"
                                            size="large"
                                            block
                                            className="mt-6 h-12 text-base font-semibold"
                                            onClick={() => navigate("/checkout")}
                                        >
                                            Proceed to Checkout
                                        </Button>

                                        <div className="mt-4 space-y-2 text-xs text-gray-500">
                                            <div className="flex items-center justify-center space-x-2">
                                                <span>🔒</span>
                                                <span>Secure Checkout</span>
                                            </div>
                                            <div className="flex items-center justify-center space-x-2">
                                                <span>📦</span>
                                                <span>Free Returns within 30 days</span>
                                            </div>
                                        </div>
                                    </Card>

                                    {/* Promo Code Card */}
                                    <Card className="mt-4">
                                        <div className="space-y-3">
                                            <h3 className="font-semibold">Have a promo code?</h3>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="Enter code"
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                                <Button type="default">Apply</Button>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}
export default CartPage