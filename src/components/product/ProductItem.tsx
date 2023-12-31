import { FC } from 'react'

import { useRouter } from 'next/router'

import { Avatar, Box, Typography } from '@mui/material'

import Product from '@/types/Product.type'

type ProductItemProps = {
    product: Product
    quantity: number
}

const ProductItem: FC<ProductItemProps> = ({ product, quantity }) => {
    const { locale } = useRouter()

    const { ingredients } = product

    const formattedIngredients = locale && ingredients[locale] ?
        ingredients[locale].map((ingredient, index) => index === 0 ?
            ingredient : ingredient.toLowerCase()) : []

    return (
        <Box display="flex" alignItems="flex-start">
            <Avatar src={product.imageUrl} sx={{ width: 50, height: 50, mr: 2 }} />

            <Box display="flex" flexDirection="column">
                <Box display="flex" flexDirection="row" alignItems="center">
                    <Typography
                        color='#A5A5A5'
                        variant="body1"
                        fontWeight={600}
                        mr={2}
                    >
                        {quantity} x {locale && product.name[locale]}
                    </Typography>

                    <Typography variant="body2" mr={2} fontWeight={600}>
                        €{product.price}
                    </Typography>
                </Box>
                
                <Typography variant="subtitle2">
                    {formattedIngredients.join(', ')}.
                </Typography>
            </Box>
        </Box>
    )
}

export default ProductItem
