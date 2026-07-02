/**
 * Modelo que representa un registro
 * del catálogo de sexos.
 */

export interface SexResponse {
  id: number;  /** Identificador único */
  strValor: string; /** Valor mostrado al usuario */
  strDescripcion: string;   /** Descripción interna */
}