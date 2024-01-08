import { FC } from 'react'

import { Button, lighten } from '@mui/material'

type ConfirmOrderButtonProps = {
    text: string,
    size: 'regular' | 'large'
    onClick: () => void
}

const ConfirmButton: FC<ConfirmOrderButtonProps> = ({ text, size, onClick }) => (
    <Button
        variant="contained"
        size='small'
        onClick={onClick}
        sx={theme => ({
            color: 'text.main',
            backgroundColor: 'buttonBackground.main',
            textTransform: 'none',
            fontWeight: 700,
            width: '100%',
            height: size === 'large' ? '50px' : '40px',
            borderRadius: '20px',
            boxShadow: `0px 0px 15px 2px ${theme.palette.buttonBackground?.main}`,
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
