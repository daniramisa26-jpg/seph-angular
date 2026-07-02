export interface UserSession {
  id: string;
  email: string;
  fullName: string;
  idInstitucion: number | null;
  roles: string[];
  permissions: string[];
}