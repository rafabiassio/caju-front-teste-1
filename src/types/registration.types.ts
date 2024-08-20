export enum RegistrationStatus {
  APPROVED = "APPROVED",
  REVIEW = "REVIEW",
  REPROVED = "REPROVED",
}

export type RegistrationId = string

export interface Registration {
  id: RegistrationId;
  admissionDate: string;
  email: string;
  employeeName: string;
  status: RegistrationStatus;
  cpf: string;
}