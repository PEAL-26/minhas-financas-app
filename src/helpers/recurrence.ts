export function getRecurrence(recurrence?: number | null) {
  if (!recurrence) return '';

  if (recurrence === 1) {
    return 'Diária';
  }

  if (recurrence === 7) {
    return 'Semanal';
  }

  if (recurrence === 30) {
    return 'Mensal';
  }

  if (recurrence === 365) {
    return 'Anual';
  }

  return `A cada ${recurrence} dias`;
}
