export interface CreateHistorialContratoRequest {
  id: number;
  dateFechaIngreso: string;
  dateFechaInicio: string;
  idEmpleado: number;
  idInstitucion: number;
  idTipoPersonal: number;
  idTipoContrato: number;
  strOtroTipoContrato: string | null;
  idArea: number;
  dateTimeFechaRegistro: string;
  bitActivo: boolean;
  dateTimeFechaBaja: string | null;
  idUsuarioRegistro: string;
}