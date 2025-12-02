import { dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const locales = {
  'pt-BR': ptBR,
}

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date:any) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales,
})