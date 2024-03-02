import { FC, useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import { useSelector } from 'react-redux'

import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'

import {
    Box, MenuItem,
    Select,
    SelectChangeEvent,
    Theme,
    Typography,
    useMediaQuery
} from '@mui/material'

import { RootState } from '@/store'

import fetchUserProfile from '@/api/user/fetchUserProfile'

import updateUserPreferredLanguage from '@/api/user/updateUserPreferredLanguage'

const LanguageSelector: FC = () => {
    const router = useRouter()
    const { i18n } = useTranslation()
    const [locale, setLocale] = useState(i18n.language)

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))
    const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

    const { isAuthenticated } = useSelector((state: RootState) => state.auth)
    const { data: userProfile } = useQuery('userProfile', fetchUserProfile,
        { enabled: !!isAuthenticated, refetchOnWindowFocus: false })

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

        if (!userProfile) return

        await updateUserPreferredLanguage(userProfile.id, newLocale)
    }

    return (
        <Select
            value={locale}
            onChange={handleLocaleChange}
            sx={{
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
                        width={isMobile ? 8 : isTablet ? 14 : 16}
                        height={isMobile ? 6 : isTablet ? 10 : 12}
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
                            <Image
                                src={flag}
                                alt={label}
                                width={isMobile ? 8 : isTablet ? 14 : 16}
                                height={isMobile ? 6 : isTablet ? 10 : 12}
                            />

                            <Typography variant='body2' sx={{
                                ml: 1,
                                fontSize: { xs: '0.8em', sm: '0.85em', lg: '0.9em' }
                            }}>
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
