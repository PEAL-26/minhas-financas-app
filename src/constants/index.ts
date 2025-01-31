import { Status, Types } from "@/types";

export const STATUS_MAP: Record<Status, string> = {
  pending: "Pendente",
  done: "Efectuada",
};

export const STATUS_COLOR = {
  pending: "warn" as const,
  done: "success" as const,
};

export const TYPES_MAP: Record<Types, string> = {
  unique: "Única",
  recurrent: "Recorrente",
};

export const RECURRENCE_MAP = {
  daily: "Diária",
  weekly: "Semanal",
  monthly: "Mensal",
  annual: "Anual",
  custom: "Personalizado",
};

export const PRIORITY_MAP = {
  0: "Mínima",
  1: "Normal",
  2: "Máxima",
};

export const PRIORITY_COLOR = {
  0: "warn" as const,
  1: "success" as const,
  2: "error" as const,
};
