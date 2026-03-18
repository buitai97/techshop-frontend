import { useEffect, useState } from 'react';
import { ShoppingCart, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { useParams } from 'react-router';
import { addToCartAPI, getProductAPI } from 'services/api';
import { buildS3ImageUrl, getProductImageKeys } from 'services/productImages';
import { useAppContext } from 'context/app.context';
import { Button, Carousel, message } from 'antd';

export default function ProductDetailPage() {
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams()
    const [product, setProduct] = useState<IProduct>()
    const { setCartSum, isAuthenticated } = useAppContext();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchProduct = async () => {
            const res = await getProductAPI(+id!)
            const product = res.data
            setProduct(product)
        }
        fetchProduct()
    }, [id])


    const handleQuantityChange = (delta: number) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1 && newQuantity <= 10) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = async (product: IProduct, quantity: number) => {
        setLoading(true);
        if (isAuthenticated) {
            setCartSum((prev: number) => prev + 1);
            await addToCartAPI(product.id, quantity);
            setLoading(false);
            message.success(`${product.name} added to cart!`);
        }
        else {
            message.error('Please login to add products to cart!');
            setLoading(false);
            return;
        }
    }

    const imageKeys = getProductImageKeys(product)

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        {imageKeys.length > 0 ? (
                            <Carousel
                                arrows
                                autoplay
                                infinite={imageKeys.length > 1}
                            >
                                {imageKeys.map((imageKey) => (
                                    <div key={imageKey}>
                                        <div className="h-96 overflow-hidden rounded-lg bg-gray-100">
                                            <img
                                                src={buildS3ImageUrl(imageKey)}
                                                alt={product?.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                        ) : (
                            <div className="h-96 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                                No image available
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product?.name}</h1>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-baseline gap-3 mb-4">
                                <span className="text-4xl font-bold text-gray-900">{new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(product?.price!)}</span>
                            </div>
                            <div>
                                <span className='text-2xl'> Category: </span>
                                <span className='text-gray-600 text-xl'> {product?.category}</span>
                            </div>

                            <div className='my-3'>
                                <span className='text-2xl'> Brand: </span>
                                <span className='text-gray-600 text-xl'> {product?.brand}</span>
                            </div>

                            <p className="text-gray-600 leading-relaxed">{product?.detailDesc}</p>
                        </div>

                        {/* Quantity */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-3">Quantity</label>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-gray-300 font-semibold"
                                >
                                    -
                                </button>
                                <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-gray-300 font-semibold"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <Button
                                type="primary"
                                onClick={() => handleAddToCart(product!, quantity)}
                                loading={loading}
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </Button>
                        </div>

                        {/* Features */}
                        <div className="border-t pt-6 space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Truck className="w-5 h-5 text-blue-600" />
                                    <span className="text-gray-600">Free Shipping</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <RotateCcw className="w-5 h-5 text-blue-600" />
                                    <span className="text-gray-600">30-Day Returns</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Shield className="w-5 h-5 text-blue-600" />
                                    <span className="text-gray-600">2-Year Warranty</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
