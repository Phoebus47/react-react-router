import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateProductForm() {
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

  const createProduct = async () => {
    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:4001/products", product);
      setSuccessMessage("Product created successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/products");
      }, 2000);
    } catch (error) {
      setIsSubmitting(false);
      if (error.response) {
        setError(error.response.data.message || "Failed to create product");
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

  const handleSubmit = (event) => {
    event.preventDefault();

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

    createProduct();
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h1>Create Product Form</h1>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

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
          {isSubmitting ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  );
}

export default CreateProductForm;
