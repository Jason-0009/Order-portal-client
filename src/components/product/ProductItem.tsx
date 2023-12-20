import { FC } from 'react'

import { Avatar, Box, Typography } from '@mui/material'

import Product from '@/types/Product.type'

type ProductItemProps = {
    product: Product
    quantity: number
}

const ProductItem: FC<ProductItemProps> = ({ product, quantity }) => {
    if (quantity === 0) return null

    return (
        <Box display={'flex'} alignItems="center">
            <Avatar src={product.imageUrl} alt={product.name} sx={{ width: 50, height: 50, mr: 2 }} />

            <Typography
                width='15%'
                color='#A5A5A5'
                fontSize='0.9em'
                fontWeight={600}
                mr={2}
            >
                {quantity} x {product.name}
            </Typography>

            <Typography fontSize='0.9em' fontWeight={600}>€{product.price}</Typography>
        </Box>
    )
}

export default ProductItem
