import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getEmpresas, getNiveles } from "../services/api";
import { getEmpresasArray, getNivelesArray } from "../utils/apiResponseHelpers";
import EmpresasTable from "../components/empresas/EmpresasTable";
import EmpresasForm from "../components/empresas/EmpresasForm";
import { useState } from "react";

export default function Empresas() {
    const queryClient = useQueryClient();
    const { data: empresasData, isLoading, isError } = useQuery({
        queryKey: ["empresas"],
        queryFn: getEmpresas,
    });
    const empresas = getEmpresasArray(empresasData);

    const { data: nivelesData, isLoading: loadingNiveles, isError: errorNiveles } = useQuery({
        queryKey: ["niveles"],
        queryFn: getNiveles,
    });
    const niveles = getNivelesArray(nivelesData);

    const [serverError, setServerError] = useState<string | null>(null);

    const refreshEmpresas = () => {
        queryClient.invalidateQueries({ queryKey: ["empresas"] });
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Empresas</h1>
            {loadingNiveles ? (
                <p>Cargando niveles...</p>
            ) : errorNiveles ? (
                <p>Error al cargar niveles</p>
            ) : (
                <EmpresasForm niveles={niveles} onSuccess={refreshEmpresas} setServerError={setServerError} />
            )}
            {serverError && <p className="text-red-600">{serverError}</p>}
            <h2 className="text-xl font-bold mb-2">Lista de Empresas</h2>
            {isLoading ? (
                <p>Cargando empresas...</p>
            ) : isError ? (
                <p>Error al cargar empresas</p>
            ) : (
                <EmpresasTable empresas={empresas} />
            )}
        </div>
    );
}