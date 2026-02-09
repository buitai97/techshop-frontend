import { getProductsAPI, getUsersAPI } from 'services/api';
import type { StatisticProps } from 'antd';
import { Col, Row, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';

const formatter: StatisticProps['formatter'] = (value) => (
    <CountUp end={value as number} separator="," />
);


const Home = () => {

    const [totalUsers, setTotalUsers] = useState<number>(0)
    const [totalProducts, setTotalProducts] = useState<number>(0)
    useEffect(() => {
        const fetchData = async () => {
            const res1 = await getProductsAPI('', 1, 1, true)
            const res2 = await getUsersAPI()
            setTotalProducts(res1.data.count)
            setTotalUsers(res2.data.count)
        }
        fetchData()
    }, [])
    return (
        <Row gutter={16} className='p-5' >
            <Col span={4}>
                <Statistic title="Active Users" value={totalUsers} formatter={formatter} />
            </Col>
            <Col span={4}>
                <Statistic title="Available Products" value={totalProducts} precision={2} formatter={formatter} />
            </Col>
        </Row>
    )
};

export default Home;