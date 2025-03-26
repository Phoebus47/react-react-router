import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

function EditProductForm({ editingProductId, initialData }) {
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const { productId } = useParams();


    const handleSubmit = async (event) => {
    event.preventDefault();
    
   
    const product = {
      name,
      price: Number(price),
      image,
      description,
    };

    try {
      const response = await axios.put(`http://localhost:4001/products/${productId}`, product);
      console.log("Product edited:", response.data);
      setName("");
      setPrice("");
      setImage("");
      setDescription("");
    } catch (error) {
      console.error("Error editing product", error);
    }
  };

  

  return (
    <form className="product-form" onSubmit={(handleSubmit)}>
      <h1>Edit Product Form</h1>
      <div className="input-container">
        <label>
          Name
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name here"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            onChange={(e) => setImage(e.target.value)}
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
            onChange={(e) => setPrice(e.target.value)}
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
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            cols={30}
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit">Update</button>
      </div>
    </form>
  );
}

export default EditProductForm;

// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// function EditProductForm() {
//   const { productId } = useParams(); // รับ productId จาก URL
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [image, setImage] = useState("");
//   const [description, setDescription] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get(`http://localhost:4001/products/${productId}`)
//       .then((response) => {
//         const product = response.data;
//         setName(product.name);
//         setPrice(product.price);
//         setImage(product.image);
//         setDescription(product.description);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching product:", error);
//         setLoading(false);
//       });
//   }, [productId]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!productId) {
//       console.error("No product ID provided for editing");
//       return;
//     }

//     const product = {
//       name,
//       price: Number(price),
//       image,
//       description,
//     };

//     try {
//       const response = await axios.put(`http://localhost:4001/products/${productId}`, product);
//       console.log("Product edited:", response.data);
//       alert("Product updated successfully!");
//     } catch (error) {
//       console.error("Error editing product", error);
//     }
//   };

//   if (loading) return <p>Loading product data...</p>;

//   return (
//     <form className="product-form" onSubmit={handleSubmit}>
//       <h1>Edit Product Form</h1>
//       <div className="input-container">
//         <label>
//           Name
//           <input
//             type="text"
//             placeholder="Enter name here"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </label>
//       </div>
//       <div className="input-container">
//         <label>
//           Image Url
//           <input
//             type="text"
//             placeholder="Enter image url here"
//             value={image}
//             onChange={(e) => setImage(e.target.value)}
//           />
//         </label>
//       </div>
//       <div className="input-container">
//         <label>
//           Price
//           <input
//             type="number"
//             placeholder="Enter price here"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//         </label>
//       </div>
//       <div className="input-container">
//         <label>
//           Description
//           <textarea
//             placeholder="Enter description here"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             rows={4}
//             cols={30}
//           />
//         </label>
//       </div>
//       <div className="form-actions">
//         <button type="submit">Update</button>
//       </div>
//     </form>
//   );
// }

// export default EditProductForm;
