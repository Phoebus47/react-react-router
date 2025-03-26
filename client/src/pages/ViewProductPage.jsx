import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ViewProductPage() {
const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const {productId} = useParams();
  
  const getProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:4001/products/${productId}`);
      setProduct(response.data.data);
      console.log(response.data.data);
      
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }

  useEffect(() => {
    getProduct();
  },[]);
  
  return (
    <div>
      <h1>View Product Page</h1>
      <div className="view-product-container">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
      </div>
      <button onClick={()=>navigate("/")}>Back to Home</button>
    </div>
  );
}

export default ViewProductPage;
