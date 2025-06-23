import type { Empresa } from "../../services/api";
import { useNavigate } from "react-router-dom";

interface EmpresasTableProps {
  empresas: Empresa[];
}

export default function EmpresasTable({ empresas }: EmpresasTableProps) {
  const navigate = useNavigate();
  if (!empresas || empresas.length === 0) {
    return <p>No hay empresas disponibles.</p>;
  }
  const sortedEmpresas = [...empresas].sort((a, b) => (a.idEmpresa ?? 0) - (b.idEmpresa ?? 0));
  return (
    <div className="overflow-x-auto rounded-xl border-1">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-300">
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Nombre</th>
            <th className="border px-2 py-1">Nivel</th>
          </tr>
        </thead>
        <tbody>
          {sortedEmpresas.map((empresa) => (
            <tr key={empresa.idEmpresa}>
              <td className="border px-2 py-1">{empresa.idEmpresa}</td>
              <td
                className="border px-2 py-1 cursor-pointer"
                onClick={() => navigate(`/empresas/${empresa.idEmpresa}`)}
              >
                {empresa.nombre}
              </td>
              <td className="border px-2 py-1">{empresa.nivel?.nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 