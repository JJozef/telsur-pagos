export const formatDate = (date) => {
  if (!date) return ''

  return new Intl.DateTimeFormat('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}
