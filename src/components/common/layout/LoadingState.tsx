import { Box, CircularProgress } from '@mui/material'

import { useTranslation } from 'next-i18next'

import Head from 'next/head'

const LoadingState = () => {
    const { t: translation } = useTranslation();

    return (
        <>
            <Head>
                <title>
                    {translation('title')} - {translation('loading')}
                </title>
            </Head>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress color="error" />
            </Box>
        </>
    );
};

export default LoadingState;
