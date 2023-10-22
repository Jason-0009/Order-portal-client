import { FC } from 'react'

import { AppBar, Toolbar, Typography } from '@mui/material'
import LocalPizzaIcon from '@mui/icons-material/LocalPizza'

const Header: FC = () => {
    return (
        <AppBar position="relative" color="primary">
            <Toolbar>
                <LocalPizzaIcon />
                
                <Typography variant="h6" sx={{ fontFamily: 'Train One', textTransform: 'uppercase' }}>
                    Awesome Pizza
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header
