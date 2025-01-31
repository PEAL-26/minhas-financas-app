import { Status, Types } from "@/types";

export const STATUS_MAP: Record<Status, string> = {
  pending: "Pendente",
  done: "Concluído",
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
