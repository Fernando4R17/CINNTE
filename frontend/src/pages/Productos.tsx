import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getEmpresas, getProductos } from "../services/api";
import { useState } from "react";
import ProductosTable from "../components/productos/ProductosTable";
import ProductosForm from "../components/productos/ProductosForm";
import { getEmpresasArray, getProductosArray } from "../utils/apiResponseHelpers";

export default function Productos() {
    const queryClient = useQueryClient();
    const { data: empresasData, isLoading: loadingEmpresas, isError: errorEmpresas } = useQuery({
        queryKey: ["empresas"],
        queryFn: getEmpresas,
    });
    const empresas = getEmpresasArray(empresasData);

    const { data: productosData, isLoading: loadingProductos, isError: errorProductos } = useQuery({
        queryKey: ["productos"],
        queryFn: getProductos,
    });

    const [serverError, setServerError] = useState<string | null>(null);

    const refreshProductos = () => {
        queryClient.invalidateQueries({ queryKey: ["productos"] });
    };
    
    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Crear Producto</h1>
            {loadingEmpresas ? (
                <p>Cargando empresas...</p>
            ) : errorEmpresas ? (
                <p>Error al cargar empresas</p>
            ) : (
                <ProductosForm empresas={empresas} onSuccess={refreshProductos} setServerError={setServerError} />
            )}
            {serverError && <p className="text-red-600">{serverError}</p>}

            <h2 className="text-xl font-bold mb-2">Lista de Productos</h2>
            {loadingProductos ? (
                <p>Cargando productos...</p>
            ) : errorProductos ? (
                <p>Error al cargar productos</p>
            ) : (
                <ProductosTable productos={getProductosArray(productosData)} />
            )}
        </div>
    );
}