import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getEmpresaById } from "../../services/api";
import type { Empresa } from "../../services/api";

export default function EmpresaDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: empresaData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["empresa", id],
    queryFn: () => getEmpresaById(Number(id)),
    enabled: !!id,
  });

  if (isLoading) return <p>Cargando empresa...</p>;
  if (isError) return <p>Error al cargar empresa: {error instanceof Error ? error.message : "Error desconocido"}</p>;
  if (!empresaData || !(empresaData as unknown as { payload?: Empresa }).payload) return <p>Empresa no encontrada.</p>;
  const empresa = (empresaData as unknown as { payload: Empresa }).payload;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Detalle de la Empresa</h1>
      <div className="space-y-2">
        <div className="flex m-4"><p className="font-bold mr-1">ID:</p> {empresa.idEmpresa}</div>
        <div className="flex m-4"><p className="font-bold mr-1">Nombre:</p> {empresa.nombre}</div>
        <div className="flex m-4"><p className="font-bold mr-1">Nivel:</p> {empresa.nivel?.nombre}</div>
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
