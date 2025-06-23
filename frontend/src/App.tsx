import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Empresas from './pages/Empresas';
import Productos from './pages/Productos';
import ProductoDetail from './components/productos/ProductoDetail';
import SearchResults from './pages/SearchResults';
import EmpresaDetail from './components/empresas/EmpresaDetail';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Productos />} />
        <Route path="/companies" element={<Empresas />} />
        <Route path="/productos/:id" element={<ProductoDetail />} />
        <Route path="/empresas/:id" element={<EmpresaDetail />} />
        <Route path="/search" element={<SearchResults />} />
      </Route>
    </Routes>
  );
}

export default App;
