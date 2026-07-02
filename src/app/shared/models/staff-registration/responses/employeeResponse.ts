export interface EmployeeResponse {
  id: number;
  strNombre: string;
  strApellidoPat: string;
  strApellidoMat: string;
  strCurp: string;
  idSexo: number;
  dateTimeFechaRegistro: string;
  idUsuarioRegistro: string;
  bitActivo: boolean;
  dateTimeFechaBaja: string | null;
}