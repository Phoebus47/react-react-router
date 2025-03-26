import "./App.css";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateProductPage from "./pages/CreateProductPage"; 
import EditProdutPage from "./pages/EditProductPage";
import ViewProductPage from "./pages/ViewProductPage";
function App() {
  return (
  <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/product/create" element={<CreateProductPage />}/>
        <Route path="/product/view/:productId" element={<ViewProductPage />}/>
        <Route path="/product/edit/:productId" element={<EditProdutPage />}/>
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>



  </div>
  );
}


export default App;
