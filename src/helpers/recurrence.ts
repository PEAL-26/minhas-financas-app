export function getRecurrence(recurrence?: number | null) {
  if (!recurrence) return "";

  if (recurrence === 1) {
    return "Diariamente";
  }

  if (recurrence === 7) {
    return "Semanalmente";
  }

  if (recurrence === 30) {
    return "Mensalmente";
  }

  if (recurrence === 365) {
    return "Anualmente";
  }

  return `A cada ${recurrence} dias`;
}
