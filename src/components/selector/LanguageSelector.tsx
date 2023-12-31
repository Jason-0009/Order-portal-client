import { FC, useState, useEffect } from 'react'

import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Image from 'next/image'

import {
    Select, Box, MenuItem, FormControl,
    InputLabel, SelectChangeEvent
} from '@mui/material'

import useAuth from '@/hooks/useAuth'
import useUserProfile from '@/hooks/user/useUserProfile'

import updateUserPreferredLanguage from '@/api/user/updateUserPreferredLanguage'

const LanguageSelector: FC = () => {
    const router = useRouter()
    const { i18n, t: translation } = useTranslation()
    const [locale, setLocale] = useState(i18n.language)

    const { isAuthenticated } = useAuth()
    const { userProfile } = useUserProfile(isAuthenticated)

    useEffect(() => {
        if (locale === router.locale) return

        router.push(router.asPath, undefined, { locale })
    }, [locale])

    const languages = [
        { code: 'en', label: 'EN', flag: '/images/flags/us.png' },
        { code: 'it', label: 'IT', flag: '/images/flags/it.png' }
    ]

    const handleLocaleChange = async (event: SelectChangeEvent<string>) => {
        const newLocale = event.target.value as string

        setLocale(newLocale)

        if (!isAuthenticated) return

        userProfile && await updateUserPreferredLanguage(userProfile.id, newLocale)
    }

    const renderLanguage = (selectedLanguage: string) => {
        const language = languages.find(language => language.code === selectedLanguage)

        return (
            <Box display="flex" alignItems="center">
                <Image
                    src={language?.flag as string}
                    alt={language?.label as string}
                    width={16}
                    height={12}
                />

                <Box ml={1}>
                    {language?.label}
                </Box>
            </Box>
        )
    }

    return (
        <FormControl variant="outlined" size="small" sx={{
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white'
            }
        }}>
            <InputLabel id="language-selector-label" sx={{ color: 'white' }}>
                {translation('languageLabel')}
            </InputLabel>

            <Select
                labelId="language-selector-label"
                value={locale}
                onChange={handleLocaleChange}
                label="Language"
                renderValue={renderLanguage}
            >
                {languages.map(({ code, flag, label }) => (
                    <MenuItem key={code} value={code}>
                        <Box display="flex" alignItems="center">
                            <Image src={flag} alt={label} width={16} height={12} />

                            <Box ml={1}>{label}</Box>
                        </Box>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default LanguageSelector
