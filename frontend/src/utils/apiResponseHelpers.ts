import type { Empresa, Producto, ApiResponse } from "../services/api";

export function getEmpresasArray(response: unknown): Empresa[] {
  if (response && typeof response === "object" && "payload" in response) {
    return (response as ApiResponse<Empresa[]>).payload ?? [];
  }
  return [];
}

export function getProductosArray(response: unknown): Producto[] {
  if (response && typeof response === "object" && "payload" in response) {
    const payload = (response as ApiResponse<unknown>).payload;
    if (Array.isArray(payload)) {
      return payload as Producto[];
    }
    if (payload && typeof payload === "object" && "productos" in payload && Array.isArray((payload as { productos: unknown }).productos)) {
      return (payload as { productos: Producto[] }).productos;
    }
  }
  return [];
}

export function getNivelesArray(response: unknown): import("../services/api").Nivel[] {
  if (response && typeof response === "object" && "payload" in response) {
    return (response as import("../services/api").ApiResponse<import("../services/api").Nivel[]>).payload ?? [];
  }
  return [];
}

export function getEmpresasFromSearchPayload(response: unknown): Empresa[] {
  if (response && typeof response === "object" && "payload" in response) {
    const payload = (response as { payload?: unknown }).payload;
    if (payload && typeof payload === "object" && "empresas" in payload && Array.isArray((payload as { empresas: unknown }).empresas)) {
      return (payload as { empresas: Empresa[] }).empresas;
    }
  }
  return [];
} 

