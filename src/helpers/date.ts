export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('pt-AO', { dateStyle: 'medium' }).format(date);
};
