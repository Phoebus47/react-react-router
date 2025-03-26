import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

function EditProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:4001/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      setFormData(data.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      navigate('/');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4001/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      navigate('/');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="p-4 bg-background min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Edit Product Page</h1>
      
      <div className="bg-card border-2 border-primary rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Edit Product Form</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name here"
              className="w-full p-3 border-2 border-primary rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-lg mb-2">Image Url</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Enter image url here"
              className="w-full p-3 border-2 border-primary rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-lg mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price here"
              className="w-full p-3 border-2 border-primary rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-lg mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description here"
              className="w-full p-3 border-2 border-primary rounded-lg h-32"
              required
            />
          </div>

          <div className="flex justify-between items-center mt-8">
            <Link
              to="/"
              className="bg-secondary text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Back to Home
            </Link>
            <button
              type="submit"
              className="bg-primary text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductPage;
