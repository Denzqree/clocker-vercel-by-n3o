import { pt } from 'date-fns/locale'
import { format } from 'date-fns'

export const formatDate = (date, pattern) => format(date, pattern, { locale: pt })
