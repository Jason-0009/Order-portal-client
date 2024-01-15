import { Box, Typography, TypographyProps } from '@mui/material'
import { FC } from 'react'

type PageTitleProps = TypographyProps & {
    text: string,
    id?: string
}

const PageTitle: FC<PageTitleProps> = ({ text, id, ...props }) => {
    return (
        <Typography
            variant="h6"
            component="h1"
            sx={{
                fontWeight: 600,
                fontSize: { xs: '0.9em', sm: '1em', md: '1.1em', lg: '1.2em' },
                mb: { xs: 1, sm: 0 },
                ...props.sx
            }}
        >
            {text} {id && <Box component="span" color='link.main'>
                #{id}
            </Box>}
        </Typography>
    )
}

export default PageTitle
