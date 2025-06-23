import Navbar from '../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-5xl mx-auto pt-28 px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout; 