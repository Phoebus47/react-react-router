import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ViewProductPage from './pages/ViewProductPage';
import CreateProductPage from './pages/CreateProductPage';
import EditProductPage from './pages/EditProductPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/view/:id" element={<ViewProductPage />} />
        <Route path="/create" element={<CreateProductPage />} />
        <Route path="/edit/:id" element={<EditProductPage />} />
        <Route path="/product/view/:id" element={<ViewProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
