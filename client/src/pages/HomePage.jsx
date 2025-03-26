import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:4001/products");
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4001/products/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="p-4 bg-background min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-primary">Products</h1>
        <Link
          to="/create"
          className="bg-primary text-white px-6 py-3 rounded-full text-lg hover:bg-secondary transition-colors"
        >
          Create Product
        </Link>
      </div>
      <div className="space-y-6">
        {products.map((product) => (
          <div key={product.id} className="bg-card rounded-lg p-6 flex relative shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-64 h-64 object-cover rounded-lg"
            />
            <div className="ml-8 flex-1">
              <h2 className="text-2xl font-bold mb-2">Product name: {product.name}</h2>
              <p className="text-xl mb-2">Product price: {product.price}</p>
              <p className="text-gray-700 mb-6">Product description: {product.description}</p>
              <div className="flex gap-4">
                <Link
                  to={`/view/${product.id}`}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  View
                </Link>
                <Link
                  to={`/edit/${product.id}`}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  Edit
                </Link>
              </div>
            </div>
            <button 
              className="absolute top-4 right-4 text-2xl text-primary font-bold hover:text-secondary transition-colors"
              onClick={() => handleDelete(product.id)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
