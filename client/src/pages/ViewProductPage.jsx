import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ViewProductPage() {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  const navigate = useNavigate();

  const { productId } = useParams();

  const getProduct = async () => {
    setIsLoading(true);
    setIsError(null);

    try {
      const response = await axios.get(
        `http://localhost:4001/products/${productId}`,
        { timeout: 5000 }
      );

      const productData = response.data?.data;

      if (!productData) {
        setIsError("Product not found");
      } else {
        setProduct(productData);
      }
    } catch (error) {
      if (error.response) {
        setIsError(
          `Error: ${error.response.status} - ${
            error.response.data?.message || "Unknown error"
          }`
        );
      } else if (error.request) {
        setIsError(
          "No response from the server. Please check your internet connection."
        );
      } else {
        setIsError(
          "An error occurred while fetching the product. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [productId]);

  if (isLoading) {
    return <h2>Loading product...</h2>;
  }

  if (isError) {
    return (
      <div>
        <h2 style={{ color: "red" }}>{isError}</h2>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  if (!product) return null;

  const { name, image, price, description } = product;

  return (
    <div className="view-product-container">
      <h1>View Product Page</h1>
      <div className="product-list">
        <div className="product-preview product-details">
          <img
            src={image || "No image available"}
            alt={name}
            width="350"
            height="350"
          />

          <h2>{name || "No Name Available"}</h2>
          <h3>Product price: {price || "Not specified"}</h3>
          <p>{description || "No description available."}</p>
        </div>
      </div>

      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}

export default ViewProductPage;
