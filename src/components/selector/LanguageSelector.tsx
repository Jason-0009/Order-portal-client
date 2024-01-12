import { FC, useState, useEffect } from 'react'

<<<<<<< HEAD
=======
import { useSelector } from 'react-redux'

>>>>>>> ef4442a7fcd9330fd6d88aff9a36ea616b943c46
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Image from 'next/image'

import {
    Select, Box, MenuItem, 
    SelectChangeEvent, Typography, lighten
} from '@mui/material'

<<<<<<< HEAD
import useAuth from '@/hooks/useAuth'
=======
import { RootState } from '@/store'

>>>>>>> ef4442a7fcd9330fd6d88aff9a36ea616b943c46
import useUserProfile from '@/hooks/user/useUserProfile'

import updateUserPreferredLanguage from '@/api/user/updateUserPreferredLanguage'

const LanguageSelector: FC = () => {
    const router = useRouter()
<<<<<<< HEAD
    const { i18n } = useTranslation()
    const [locale, setLocale] = useState(i18n.language)

    const { isAuthenticated } = useAuth()
    const { userProfile } = useUserProfile(isAuthenticated)
=======
    const isAuthenticated = useSelector((state: RootState) => state.auth)
    const { i18n } = useTranslation()
    const [locale, setLocale] = useState(i18n.language)

    const { userProfile } = useUserProfile()
>>>>>>> ef4442a7fcd9330fd6d88aff9a36ea616b943c46

    useEffect(() => {
        if (locale === router.locale) return

        router.push(router.asPath, undefined, { locale })
    }, [locale, router])

    const languages = [
        { code: 'it', label: 'Italiano', flag: '/images/flags/it.png' },
        { code: 'en', label: 'English', flag: '/images/flags/us.png' }
    ]

    const handleLocaleChange = async (event: SelectChangeEvent<string>) => {
        const newLocale = event.target.value as string

        setLocale(newLocale)

        if (!isAuthenticated) return

        userProfile && await updateUserPreferredLanguage(userProfile.id, newLocale)
    }

    return (
        <Select
            value={locale}
            onChange={handleLocaleChange}
            sx={{
                mr: 0.5,
                "& fieldset": {
                    border: 'none'
                }
            }}
            renderValue={selectedLanguage => {
                const language = languages.find(language => language.code === selectedLanguage)

                return (
                    <Image
                        src={language?.flag as string}
                        alt={language?.label as string}
                        width={16}
                        height={12}
                    />
                )
            }}
        >
            {languages.map(({ code, flag, label }, index, array) => {
                const isFirstItem = index === 0
                const isLastItem = index === array.length - 1

                return (
                    <MenuItem key={code} value={code} sx={{
                        backgroundColor: 'secondary.main',
                        '&.MuiMenuItem-root': {
                            marginTop: isFirstItem ? '-0.5em' : 'auto',
                            marginBottom: isLastItem ? '-0.5em' : 'auto',
                            '&.Mui-selected': {
                                backgroundColor: 'secondary.main'
                            },
                            '&:hover': {
                                backgroundColor: 'primary.main'
                            }
                        }
                    }}>
                        <Box display="flex" alignItems="center">
                            <Image src={flag} alt={label} width={16} height={12} />

                            <Typography variant="body2" ml={1}>
                                {label}
                            </Typography>
                        </Box>
                    </MenuItem>
                )
            })}
        </Select>
    )
}

export default LanguageSelector
