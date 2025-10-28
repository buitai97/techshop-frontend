import { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Badge, Typography, Tag, message, Spin, Flex } from 'antd';
import { LoadingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { addToCartAPI, getProductsAPI } from '@/services/api';
import { useAppContext } from '@/context/app.provider';

const { Title, Text, Paragraph } = Typography;

const FeatureProducts = () => {
    const { setCartSum } = useAppContext();
    const [products, setProducts] = useState<IProduct[]>();
    const [dataLoading, setDataLoading] = useState(false);
    useEffect(() => {

        const fetchProducts = async () => {
            setDataLoading(true);
            const res = await getProductsAPI(1, 6, true)
            const products = res.data.products
            setProducts(products)
            setDataLoading(false);
        }
        fetchProducts()

    }, [])
    const [loading, setLoading] = useState<any>({});

    const handleAddToCart = async (product: IProduct) => {
        setLoading((prev: any) => ({ ...prev, [product.id]: true }));
        setCartSum((prev: number) => prev + 1);
        const res = await addToCartAPI(product.id, 1);
        setLoading((prev: any) => ({ ...prev, [product.id]: false }));
        message.success(`${product.name} added to cart!`);
    };

    const cardActions = (product: IProduct) => [
        <Button
            key="cart"
            type="primary"
            icon={<ShoppingCartOutlined />}
            loading={loading[product.id]}
            onClick={() => handleAddToCart(product)}
            disabled={product.quantity == 0}
            className={`${product.quantity != 0 ? 'bg-gradient-to-r! from-blue-500 to-purple-600 border-none hover:from-blue-600 hover:to-purple-700' : ''} 
        transition-all duration-300 hover:scale-105 hover:shadow-lg`}
        >
            {product.quantity != 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
    ];
    if (!dataLoading) {
        return (

            <div>
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <Title
                            level={1}
                            className="text-white text-5xl font-bold mb-4 drop-shadow-lg"
                        >
                            Featured Products
                        </Title>
                        <Text className="text-white text-xl font-light opacity-90">
                            Discover our handpicked selection of premium items
                        </Text>
                    </div>

                    {/* Products Grid */}
                    <Row gutter={[24, 24]} className="px-4">
                        {products?.map((product: IProduct) => (
                            <Col
                                key={product.id}
                                xs={24}
                                sm={12}
                                md={8}
                                lg={8}
                                xl={8}
                            >
                                <Badge.Ribbon
                                    text={product.category}
                                    className={product.category ? 'block' : 'hidden'}
                                >
                                    <Card
                                        hoverable
                                        cover={
                                            <div className="h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 group">
                                                <img
                                                    alt={product.name}
                                                    src={`${import.meta.env.VITE_API_BASE_URL}/images/product/${product.image}`}
                                                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                                                />
                                            </div>
                                        }
                                        actions={cardActions(product)}
                                        className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl 
                    hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out
                    transform hover:scale-[1.01] overflow-hidden"
                                    >
                                        <div className="p-2">
                                            {/* Category Tag */}
                                            <Tag
                                                color="blue"
                                                className="mb-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                                            >
                                                {product.brand}
                                            </Tag>

                                            {/* Product Title */}
                                            <Title
                                                level={4}
                                                className="mb-3 text-gray-800 leading-tight hover:text-blue-600! text-center transition-colors duration-300"
                                                ellipsis={{ rows: 1 }}
                                            >
                                                {product.name}
                                            </Title>

                                            {/* Description */}
                                            <Paragraph
                                                className="text-gray-600! text-center mb-4 text-sm leading-relaxed line-clamp-3"
                                                ellipsis={{ rows: 1 }}
                                            >
                                                {product.shortDesc}
                                            </Paragraph>

                                            {/* Price Section */}
                                            <div>
                                                <Text className="!text-2xl !text-gray-500 font-bold flex justify-center">
                                                    {new Intl.NumberFormat('us-US', {
                                                        style: 'currency',
                                                        currency: 'USD'
                                                    }).format(product.price)}
                                                </Text>
                                            </div>
                                        </div>
                                    </Card>
                                </Badge.Ribbon>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        );
    }
    else {
        return (
            <Flex justify="center" align="middle" style={{ height: "100%" }}>
                <Spin indicator={<LoadingOutlined spin />} />
            </Flex>
        );
    }
}

export default FeatureProducts;