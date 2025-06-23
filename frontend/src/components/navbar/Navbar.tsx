import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search)}`);
    }
  };

  const tabClass = (path: string) =>
    `px-4 py-2 rounded transition-colors font-medium ${location.pathname === path ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-100'}`;

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <nav className="flex items-center justify-between max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center gap-2">
          <Link to="/" className={tabClass('/')}>Productos</Link>
          <Link to="/companies" className={tabClass('/companies')}>Empresas</Link>
        </div>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="rounded border border-gray-300 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-colors font-semibold cursor-pointer">Buscar</button>
        </form>
      </nav>
    </header>
  );
};

export default Navbar; 