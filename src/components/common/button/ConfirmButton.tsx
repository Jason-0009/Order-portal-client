import { FC } from 'react'

import { Button, lighten } from '@mui/material'

type ConfirmOrderButtonProps = {
    text: string,
    size: 'small' | 'medium' | 'large',
    onClick: () => void
}

const ConfirmButton: FC<ConfirmOrderButtonProps> = ({ text, size, onClick }) => (
    <Button
        variant="contained"
        size={size}
        onClick={onClick}
        sx={theme => ({
            color: 'text.main',
            backgroundColor: 'buttonBackground.main',
            textTransform: 'none',
            fontWeight: 600,
            width: { sm: size === 'small' ? '30%' : '100%' },
            height: { sm: size === 'small' ? '35px' : size === 'medium' ? '40px' : '50px' },
            fontSize: { xs: '0.7em', sm: '0.8em', md: '0.88em', lg: '0.94em' },
            lineHeight: '1.5em',
            borderRadius: '20px',
            boxShadow: `0px 0px 15px 1px ${theme.palette.buttonBackground?.main}`,
            '&:hover': {
                backgroundColor: lighten(theme.palette.buttonBackground?.main || '', 0.2),
                boxShadow: `0px 0px 15px 4px ${lighten(theme.palette.buttonBackground?.main || '', 0.2)}`,
            }
        })}
    >
        {text}
    </Button>
)


export default ConfirmButton
