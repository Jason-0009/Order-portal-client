import { format, formatDistanceToNow } from 'date-fns'
import { enUS, it } from 'date-fns/locale'

type Locale = typeof enUS | typeof it

const locales: { [key: string]: Locale } = { en: enUS, it: it }

export const formatDistanceToNowLocale = (dateInput: string, localeKey: string): string => {
    const date = new Date(dateInput)
    const dateFnsLocale = localeKey && locales.hasOwnProperty(localeKey) ?
        locales[localeKey] as Locale : undefined

    return formatDistanceToNow(date, { addSuffix: true, locale: dateFnsLocale })
}

export const formatDateLocale = (dateInput: string, localeKey: string): string => {
    const date = new Date(dateInput)
    const dateFnsLocale = localeKey && locales.hasOwnProperty(localeKey) ?
        locales[localeKey] as Locale : undefined
        
    return format(date, 'dd MMM. yyyy', { locale: dateFnsLocale })
}
