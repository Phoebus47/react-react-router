import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditProductForm() {
  const [product, setProduct] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { name, image, price, description } = product;
  const navigate = useNavigate();
  const { productId } = useParams();

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4001/products/${productId}`
      );
      setProduct(response.data.data);
    } catch (error) {
      setError("Failed to fetch product data.");
      console.error(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [productId]);

  const updateProduct = async () => {
    setIsSubmitting(true);
    try {
      await axios.put(`http://localhost:4001/products/${productId}`, product);
      setSuccessMessage("Product updated successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/products");
      }, 2000);
    } catch (error) {
      setIsSubmitting(false);
      if (error.response) {
        setError(error.response.data.message || "Failed to update product");
      } else {
        setError("Network error, please try again later.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const validateImageUrl = (url) => {
    const regex = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/i;
    return regex.test(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccessMessage("");

    if (!product.name || !product.price || !product.description) {
      setError("Please fill in all fields");
      return;
    }

    const priceValue = Number(price);
    if (priceValue <= 0 || isNaN(priceValue) || !Number.isInteger(priceValue)) {
      setError("Please enter a valid integer price greater than zero");
      return;
    }

    if (image && !validateImageUrl(image)) {
      setError("Please enter a valid image URL (e.g. http://...)");
      return;
    }

    updateProduct();
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h1>Edit Product Form</h1>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <div className="input-container">
        <label>
          Name
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name here"
            value={name}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Image Url
          <input
            id="image"
            name="image"
            type="text"
            placeholder="Enter image url here"
            value={image}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Price
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Enter price here"
            value={price}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Enter description here"
            value={description}
            onChange={handleChange}
            rows={4}
            cols={30}
            disabled={isSubmitting}
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
}

export default EditProductForm;
