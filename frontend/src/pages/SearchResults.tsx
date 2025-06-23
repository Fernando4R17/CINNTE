import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchProductos } from "../services/api";
import ProductosTable from "../components/productos/ProductosTable";
import EmpresasTable from "../components/empresas/EmpresasTable";
import { getProductosArray, getEmpresasFromSearchPayload } from "../utils/apiResponseHelpers";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const {
    data: productosData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchProductos(query),
    enabled: !!query,
  });

  const productos = getProductosArray(productosData);
  const empresas = getEmpresasFromSearchPayload(productosData);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Resultados de búsqueda</h1>
      <p className="mb-4">Buscando: <span className="font-mono">{query}</span></p>
      {isLoading ? (
        <p>Buscando productos...</p>
      ) : isError ? (
        <p className="text-red-600">Error al buscar productos: {error instanceof Error ? error.message : "Error desconocido"}</p>
      ) : (
        <>
          {empresas.length > 0 && <>
            <h2 className="text-xl font-bold mb-2">Empresas</h2>
            <EmpresasTable empresas={empresas} />
          </>}
          {productos.length > 0 && <>
            <h2 className="text-xl font-bold mb-2">Productos</h2>
            <ProductosTable productos={productos} />
          </>}
          {empresas.length === 0 && productos.length === 0 && <p>No se encontraron resultados.</p>}
        </>
      )}
    </div>
  );
} 