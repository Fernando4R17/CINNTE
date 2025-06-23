import type { Empresa, ProductoInput } from "../../services/api";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createProducto } from "../../services/api";

interface ProductosFormProps {
  empresas: Empresa[];
  onSuccess: () => void;
  setServerError: (msg: string | null) => void;
}

export default function ProductosForm({ empresas, onSuccess, setServerError }: ProductosFormProps) {
  const [form, setForm] = useState({ codigo: "", nombre: "", alias: "", empresaId: "" });

  const mutation = useMutation({
    mutationFn: (data: ProductoInput) => createProducto(data),
    onSuccess: () => {
      setForm({ codigo: "", nombre: "", alias: "", empresaId: "" });
      setServerError(null);
      onSuccess();
    },
    onError: (error: unknown) => {
      let message = "Error al crear producto";
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
    if (!form.empresaId) return;
    mutation.mutate({
      codigo: form.codigo,
      nombre: form.nombre,
      alias: form.alias,
      idEmpresa: +form.empresaId,
    } as ProductoInput);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      {["codigo", "nombre", "alias"].map((field) => (
        <div key={field}>
          <label className="block mb-1 font-medium">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input
            type="text"
            name={field}
            value={form[field as keyof typeof form]}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
      ))}
      <div>
        <label className="block mb-1 font-medium">Empresa</label>
        <select
          name="empresaId"
          value={form.empresaId}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          required
        >
          <option value="">Seleccione una empresa</option>
          {empresas.map((empresa, idx) => (
            <option key={empresa.idEmpresa ?? idx} value={empresa.idEmpresa}>
              {empresa.nombre}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
        disabled={mutation.status === "pending"}
      >
        {mutation.status === "pending" ? "Creando..." : "Crear Producto"}
      </button>
      {mutation.isSuccess && <p className="text-green-600">¡Producto creado!</p>}
    </form>
  );
}
