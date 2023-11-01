import { FC } from 'react'

import NextLink from 'next/link'

import { Box, Link, IconButton, Typography, Divider, List, ListItem } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

const Orders: FC = () => {
    const orders = ['Order 1', 'Order 2', 'Order 3']

    return (
        <Box>
            <Link component={NextLink} href="/" color="grey.600">
                <IconButton edge="start" color="inherit" aria-label="back" disableRipple>
                    <ArrowBackIosIcon />

                    <Typography variant="body2">
                        Indietro
                    </Typography>
                </IconButton>
            </Link>

            <Typography variant="h4" component="h1" gutterBottom>
                Cronologia ordini
            </Typography>

            <Divider />

            <List>
                {orders.map((order, index) => (
                    <ListItem key={index}>
                        {order}
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default Orders
