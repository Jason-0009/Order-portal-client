import { FC } from 'react'
import { Avatar, Box, Typography } from '@mui/material'

import Pizza from '@/types/Pizza.type'

type PizzaItemProps = {
    pizza: Pizza
    quantity: number
}

const PizzaItem: FC<PizzaItemProps> = ({ pizza, quantity }) => {
    if (quantity === 0) return null

    return (
        <Box display={'flex'} alignItems="center">
            <Avatar src={pizza.imageUrl} alt={pizza.name} sx={{ width: 50, height: 50, mr: 2 }} />

            <Typography
                width='15%'
                color='#A5A5A5'
                fontSize='0.9em'
                fontWeight={600}
                mr={2}
            >
                {quantity} x {pizza.name}
            </Typography>

            <Typography fontSize='0.9em' fontWeight={600}>€{pizza.price}</Typography>
        </Box>
    )
}

export default PizzaItem
