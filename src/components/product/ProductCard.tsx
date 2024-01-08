import { FC } from 'react'
import { useDispatch } from 'react-redux'

import { useRouter } from 'next/router'

import {
    Card, CardContent, CardMedia,
    Typography, CardActionArea
} from '@mui/material'

import { addToCart } from '@/slices/cartSlice'

import formatIngredients from '@/utils/formatIngredients'

import Product from '@/types/Product.type'

type ProductCardProps = {
    product: Product
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const { imageUrl, name, ingredients, price } = product

    const { locale } = useRouter()
    const dispatch = useDispatch()

    const formattedIngredients = formatIngredients(ingredients, locale)

    const handleAddToCart = () => dispatch(addToCart({ product, quantity: 1 }))

    return (
        <Card sx={theme => ({
            borderRadius: '20px',
            overflow: 'visible',
            mt: 12
        })}>
            <CardActionArea onClick={handleAddToCart}>
                <CardContent sx={theme => ({
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: '20px',
                    backgroundColor: 'secondary.main',
                    boxShadow: `0px 4px 4px 0px ${theme.palette.secondary.main}`
                })}>
                    <CardMedia
                        image={imageUrl}
                        component="img"
                        sx={{
                            height: '150px',
                            width: '150px',
                            marginTop: '-75px',
                            mb: 1
                        }}
                    />

                    <Typography variant="body2" sx={{
                        textAlign: 'center',
                        fontWeight: 600,
                        mb: 1
                    }}>
                        {locale && name[locale]}
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                        € {price}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{
                        textAlign: 'center',
                        height: '7em',
                        px: 1
                    }}>
                        {formattedIngredients.join(', ')}.
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default ProductCard
