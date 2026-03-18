import { useEffect, useState } from 'react';
import { ShoppingCart, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { useParams } from 'react-router';
import { addToCartAPI, getProductAPI } from 'services/api';
import { buildS3ImageUrl, getProductImageKeys } from 'services/productImages';
import { useAppContext } from 'context/app.context';
import { Button, Carousel, Flex, Spin, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function ProductDetailPage() {
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams()
    const [product, setProduct] = useState<IProduct>()
    const [pageLoading, setPageLoading] = useState(true)
    const { setCartSum, isAuthenticated } = useAppContext();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchProduct = async () => {
            setPageLoading(true)
            try {
                const res = await getProductAPI(+id!)
                const product = res.data
                setProduct(product)
            } finally {
                setPageLoading(false)
            }
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
    const quickSpecs = [
        { label: "Condition", value: "Brand new" },
        { label: "Availability", value: (product?.quantity ?? 0) > 0 ? "In stock" : "Out of stock" },
        { label: "Returns", value: "30-day return window" },
    ]
    const buyingReasons = [
        "Fast checkout and secure payment flow",
        "Carefully packed before dispatch",
        "Support team available for setup questions",
    ]
    const supportCards = [
        {
            title: "What's In The Box",
            body: "Your order includes the laptop, charger, and the standard accessories provided by the manufacturer.",
        },
        {
            title: "Delivery & Returns",
            body: "Free shipping on qualifying orders, plus 30-day returns if the product is not the right fit.",
        },
        {
            title: "Protection Plan",
            body: "Every purchase includes warranty coverage and post-purchase support for common setup issues.",
        },
    ]

    if (pageLoading) {
        return (
            <div className="min-h-[60vh]">
                <Flex justify="center" align="center" style={{ minHeight: "60vh" }}>
                    <Spin indicator={<LoadingOutlined spin />} size="large" />
                </Flex>
            </div>
        )
    }

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="overflow-hidden">
                    <div className="grid gap-0 md:grid-cols-2">
                        {/* Image Gallery */}
                        <div className="space-y-4  p-6 ">
                            {imageKeys.length > 0 ? (
                                <Carousel
                                    arrows
                                    autoplay
                                    infinite={imageKeys.length > 1}
                                    className="product-detail-carousel"
                                >
                                    {imageKeys.map((imageKey) => (
                                        <div key={imageKey}>
                                            <div className="h-96 overflow-hidden">
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
                                <div className="h-96 rounded-[28px] bg-slate-100 ring-1 ring-slate-200 flex items-center justify-center text-slate-500">
                                    No image available
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6 p-6 md:p-8">
                            <div>
                                <div className="mb-4 flex flex-wrap items-center gap-3">
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">
                                        {product?.category}
                                    </span>
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">
                                        {product?.brand}
                                    </span>
                                </div>
                                <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-3">{product?.name}</h1>
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < 5 ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm font-medium text-slate-500">Trusted by shoppers for everyday performance</span>
                                </div>

                                <div className="flex items-baseline gap-3 mb-6">
                                    <span className="text-4xl font-bold text-slate-900">{new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD'
                                    }).format(product?.price!)}</span>

                                </div>

                                <p className="text-slate-600 leading-8 text-[15px]">{product?.detailDesc}</p>
                            </div>

                            {/* Quantity */}
                            <div className="border-t border-slate-200 pt-6">
                                <label className="block text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 mb-3">Quantity</label>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        className="w-11 h-11 rounded-2xl border border-slate-200 bg-white text-slate-700 hover:border-slate-400 font-semibold"
                                    >
                                        -
                                    </button>
                                    <span className="w-12 text-center text-lg font-semibold text-slate-900">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        className="w-11 h-11 rounded-2xl border border-slate-200 bg-white text-slate-700 hover:border-slate-400 font-semibold"
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
                                    className="!h-12 !rounded-2xl !border-0 !bg-slate-900 px-6 !shadow-lg hover:!bg-sky-700"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Add to Cart
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="grid gap-4 border-t border-slate-200 py-8 md:grid-cols-3">
                    <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5 border border-slate-200">
                        <div className="rounded-2xl bg-white p-3 shadow-sm">
                            <Truck className="w-5 h-5 text-sky-700" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-900">Free Shipping</p>
                            <span className="text-sm text-slate-600">Fast delivery on qualifying orders.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5 border border-slate-200">
                        <div className="rounded-2xl bg-white p-3 shadow-sm">
                            <RotateCcw className="w-5 h-5 text-sky-700" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-900">30-Day Returns</p>
                            <span className="text-sm text-slate-600">Simple return support if it is not the right fit.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5 border border-slate-200">
                        <div className="rounded-2xl bg-white p-3 shadow-sm">
                            <Shield className="w-5 h-5 text-sky-700" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-900">2-Year Warranty</p>
                            <span className="text-sm text-slate-600">Extra peace of mind after purchase.</span>
                        </div>
                    </div>
                </div>

                <div className="grid gap-0 lg:grid-cols-[1.35fr_0.85fr]">
                    <section className="p-7 md:p-8">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">Product Overview</p>
                        <h2 className="mt-3 text-2xl font-bold text-slate-900">Why this model feels like a strong fit</h2>
                        <p className="mt-4 text-slate-600 leading-8">
                            {product?.detailDesc || "This product is built for everyday performance, dependable use, and a smooth buying experience."}
                        </p>

                        <div className="mt-6 grid md:grid-cols-3 gap-4">
                            {supportCards.map((card) => (
                                <div key={card.title} className="rounded-3xl bg-slate-50 p-5">
                                    <h3 className="text-base font-semibold text-slate-900">{card.title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">{card.body}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <aside className="space-y-0 p-7 md:p-8">
                        <div className="pb-6">
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">Quick Specs</p>
                            <div className="mt-5 space-y-4">
                                {quickSpecs.map((spec) => (
                                    <div key={spec.label} className="flex items-center justify-between border-b border-slate-200 pb-3">
                                        <span className="text-slate-500">{spec.label}</span>
                                        <span className="font-medium text-right text-slate-900">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border-slate-200 pt-6">
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">Purchase Perks</p>
                            <div className="mt-4 space-y-3">
                                {buyingReasons.map((reason) => (
                                    <div key={reason} className="flex gap-3">
                                        <div className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-900" />
                                        <p className="text-sm leading-6 text-slate-700">{reason}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
