import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductoById } from "../../services/api";
import type { Producto } from "../../services/api";

export default function ProductoDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: producto,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["producto", id],
    queryFn: () => getProductoById(Number(id)),
    enabled: !!id,
  });

  if (isLoading) return <p>Cargando producto...</p>;
  if (isError) return <p>Error al cargar producto: {error instanceof Error ? error.message : "Error desconocido"}</p>;
  if (!producto || !(producto as unknown as { payload?: Producto }).payload) return <p>Producto no encontrado.</p>;
  const prod = (producto as unknown as { payload: Producto }).payload;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Detalle del Producto</h1>
      <div className="space-y-2">
        <div className="flex m-4"><p className="font-bold mr-1">Código:</p> {prod.codigo}</div>
        <div className="flex m-4"><p className="font-bold mr-1">Nombre:</p> {prod.nombre}</div>
        <div className="flex m-4"><p className="font-bold mr-1">Alias:</p> {prod.alias}</div>
        <div className="flex m-4"><p className="font-bold mr-1">Empresa:</p> {prod.empresa?.nombre}</div>
        <button
          className="bg-blue-500 p-2 w-20 rounded-sm items-center hover:bg-blue-600 text-white cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Regresar
        </button>
      </div>
    </div>
  );
}
