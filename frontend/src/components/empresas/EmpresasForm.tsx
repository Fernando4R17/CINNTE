import type { Nivel, EmpresaInput } from "../../services/api";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createEmpresa} from "../../services/api";

interface EmpresasFormProps {
  niveles: Nivel[];
  onSuccess: () => void;
  setServerError: (msg: string | null) => void;
}

export default function EmpresasForm({ niveles, onSuccess, setServerError }: EmpresasFormProps) {
  const [form, setForm] = useState({ nombre: "", nivelId: "" });  

  const mutation = useMutation({
    mutationFn: (data: EmpresaInput) => createEmpresa(data),
    onSuccess: () => {
      setForm({ nombre: "", nivelId: "" });
      setServerError(null);
      onSuccess();
    },
    onError: (error: unknown) => {
      let message = "Error al crear empresa";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "object" && error !== null && "response" in error) {
        // @ts-expect-error: error vendrá de fetcher
        message = error.response.data?.message || message;
      }
      setServerError(message);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nivelId) return;
    mutation.mutate({
      nombre: form.nombre,
      idNivel: +form.nivelId ,
    } as EmpresaInput);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div>
        <label className="block mb-1 font-medium">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Nivel</label>
        <select
          name="nivelId"
          value={form.nivelId}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          required
        >
          <option value="">Seleccione un nivel</option>
          {niveles.map((nivel) => (
              <option key={nivel.idNivel} value={nivel.idNivel}>
                {nivel.nombre}
              </option>
            ))
          }
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
        disabled={mutation.status === "pending"}
      >
        {mutation.status === "pending" ? "Creando..." : "Crear Empresa"}
      </button>
      {mutation.isSuccess && <p className="text-green-600">¡Empresa creada!</p>}
    </form>
  );
}
