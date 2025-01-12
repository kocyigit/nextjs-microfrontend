import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row } from 'antd';
import { Product } from '@/types';
 
const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Product List</h1>
      <Row gutter={16}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          products.map((product) => (
            <Col span={8} key={product.id}>
              <Card title={product.title} hoverable>
                <img src={product.image} alt={product.title} style={{ width: '100%' }} />
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default HomePage;
