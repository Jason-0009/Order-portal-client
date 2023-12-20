import { FC, useState, useEffect } from 'react'

import { useRouter } from 'next/router'

import { Select, MenuItem } from '@mui/material'

import Flag from 'react-world-flags'

const LanguageSelector: FC = () => {
    const router = useRouter()
    const [locale, setLocale] = useState(router.locale)

    useEffect(() => {
        if (locale === router.locale) return // Guard clause

        router.push(router.pathname, router.asPath, { locale })
    }, [locale])

    const languages = [
        { code: 'en', label: 'EN', flag: 'us' },
        { code: 'it', label: 'IT', flag: 'it' },
    ]

    return (
        <Select
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            renderValue={selectedLanguage => {
                const language = languages.find(language => language.code === selectedLanguage)

                return (
                    <>
                        <Flag code={language?.flag} height="16" /> {language?.label}
                    </>
                )
            }}
        >
            {languages.map((language) => (
                <MenuItem key={language.code} value={language.code}>
                    <Flag code={language.flag} height="16" /> {language.label}
                </MenuItem>
            ))}
        </Select>
    )
}

export default LanguageSelector
