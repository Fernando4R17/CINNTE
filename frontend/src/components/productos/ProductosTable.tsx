import type { Producto } from "../../services/api";
import { useNavigate } from "react-router-dom";

interface ProductosTableProps {
  productos: Producto[];
}

function hasIdProducto(producto: unknown): producto is { idProducto: number } {
  return typeof producto === 'object' && producto !== null && 'idProducto' in producto && typeof (producto as { idProducto?: unknown }).idProducto === 'number';
}

function hasId(producto: unknown): producto is { id: number } {
  return typeof producto === 'object' && producto !== null && 'id' in producto && typeof (producto as { id?: unknown }).id === 'number';
}

export default function ProductosTable({ productos }: ProductosTableProps) {
  const navigate = useNavigate();
  if (!productos || productos.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }
  return (
    <div className="overflow-x-auto rounded-xl border-1">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-300">
            <th className="border px-2 py-1">Código</th>
            <th className="border px-2 py-1">Nombre</th>
            <th className="border px-2 py-1">Alias</th>
            <th className="border px-2 py-1">Empresa</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, idx) => {
            const id = hasIdProducto(producto)
              ? producto.idProducto
              : hasId(producto)
              ? (producto as { id: number }).id
              : idx;
            return (
              <tr key={id}>
                <td
                  className="border px-2 py-1 cursor-pointer"
                  onClick={() => navigate(`/productos/${id}`)}
                >
                  {producto.codigo}
                </td>
                <td
                  className="border px-2 py-1 cursor-pointer"
                  onClick={() => navigate(`/productos/${id}`)}
                >
                  
                  {producto.nombre}
                </td>
                <td
                  className="border px-2 py-1 cursor-pointer"
                  onClick={() => navigate(`/productos/${id}`)}
                >
                  {producto.alias}
                </td>
                <td 
                  className="border px-2 py-1 cursor-pointer"
                  onClick={() => navigate(`/empresas/${producto.empresa?.idEmpresa}`)}
                >
                  {producto.empresa?.nombre}
                  </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
} 