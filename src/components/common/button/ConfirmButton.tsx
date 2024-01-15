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
            width: size === 'small' ? '30%': '100%',
            height: {
                xs: size === 'small' ? '25px' : size === 'medium' ? '20px' : '40px',
                sm: size === 'small' ? '35px' : size === 'medium' ? '20px' : '40px',
                md: size === 'small' ? '35px' : size === 'medium' ? '25px' : '45px',
                lg: size === 'small' ? '35px' : size === 'medium' ? '30px' : '50px'
            },
            fontSize: {
                xs: size === 'small' ? '0.6em' : size === 'medium' ? '0.6em' : '0.7em',
                sm: size === 'small' ? '0.75em' : size === 'medium' ? '0.65em' : '0.8emem',
                md: size === 'small' ? '0.8em' : size === 'medium' ? '0.7em' : '0.9em',
                lg: size === 'small' ? '0.85em' : size === 'medium' ? '0.8em' : '1em'
            },
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
