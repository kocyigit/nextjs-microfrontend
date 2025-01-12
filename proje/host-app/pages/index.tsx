import dynamic from 'next/dynamic';

 
const Products = dynamic(() => import('@remote-products/Products'), { ssr: false });

const HomePage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Product List from Remote</h1>
      <Products />
    </div>
  );
};

export default HomePage;
