const API_URL = 'http://localhost:3000/api';

// --- Interfaces ---
export interface ApiResponse<T> {
  success: boolean;
  payload: T;
  status: number;
  message: string;
  url?: string;
  timestamp?: number;
}

export interface Nivel {
  idNivel: number;
  nombre: string;
}

export interface Empresa {
  idEmpresa?: number;
  nombre: string;
  nivel: Nivel;
}

export interface Banco {
  idBanco: number;
  nombre: string;
  nivel: Nivel;
}

export interface Producto {
  idProducto: number;
  codigo: string;
  nombre: string;
  alias: string;
  empresa: Empresa;
}

export type ProductoInput = Omit<Producto, 'id' | 'empresa' | 'nivel'> & {
  idEmpresa: number;
  idNivel: number;
};

export type EmpresaInput = Omit<Empresa, 'id' | 'nivel'> & {
  idNivel: number;
};

// --- Fetch Helper ---
async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorInfo = await response.json();
    throw new Error(errorInfo.message || 'An unknown error occurred');
  }

  return response.json();
}

// --- API Functions ---

// Empresas
export const getEmpresas = () => fetcher<Empresa[]>('empresas');
export const getEmpresaById = (id: number) => fetcher<Empresa>(`empresas/${id}`);
export const createEmpresa = (data: EmpresaInput) => fetcher<Empresa>('empresas', {
  method: 'POST',
  body: JSON.stringify(data),
});

// Bancos
export const getBancos = () => fetcher<Banco[]>('bancos');
export const getBancoById = (id: number) => fetcher<Banco>(`bancos/${id}`);

// Productos
export const getProductos = () => fetcher<Producto[]>('productos');
export const getProductoById = (id: number) => fetcher<Producto>(`productos/${id}`);
export const createProducto = (data: ProductoInput) => fetcher<Producto>('productos', {
  method: 'POST',
  body: JSON.stringify(data),
});

// Niveles
export const getNiveles = () => fetcher<Nivel[]>('niveles');
export const getNivelById = (id: number) => fetcher<Nivel>(`niveles/${id}`);

// Busqueda
export const searchProductos = (query: string) => fetcher<Producto[]>(`search?q=${encodeURIComponent(query)}`);

