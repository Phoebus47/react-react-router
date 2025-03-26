import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ViewProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:4001/products/${id}`);
      const data = await response.json();
      setProduct(data.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  if (!product) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4 bg-background min-h-screen">
      <h1 className="text-3xl font-bold mb-6">View Product Page</h1>
      <div className="bg-card border-2 border-primary rounded-lg p-6">
        <div className="mb-4">
          <span className="font-bold">Name: </span>
          {product.name}
        </div>
        <div className="mb-4">
          {product.price} THB
        </div>
        <div className="mb-4">
          {product.description}
        </div>
      </div>
      <Link
        to="/"
        className="inline-block mt-6 bg-primary text-white px-6 py-3 rounded-full hover:bg-secondary transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default ViewProductPage;
