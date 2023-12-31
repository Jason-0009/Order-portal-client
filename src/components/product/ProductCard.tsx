import { FC } from 'react'
import { useDispatch } from 'react-redux'

import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import {
    Card, CardContent, CardMedia,
    Typography, Divider, Box, Button
} from '@mui/material'

import { ShoppingCart } from '@mui/icons-material'

import { addToCart } from '@/slices/cartSlice'

import Product from '@/types/Product.type'

type ProductCardProps = {
    product: Product
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const { imageUrl, name, ingredients, price } = product

    const { locale } = useRouter()
    const dispatch = useDispatch()
    const { t: translation } = useTranslation()

    const formattedIngredients = locale && ingredients[locale] ?
        ingredients[locale].map((ingredient, index) => index === 0 ?
            ingredient : ingredient.toLowerCase()) : []

    const handleAddToCart = () => dispatch(addToCart({ product: product, quantity: 1 }))

    return (
        <Card sx={{ boxShadow: 'none' }}>
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <CardMedia
                    image={imageUrl}
                    component="img"
                    sx={{ height: '150px', width: '150px' }}
                />

                <Typography variant="h6" component="div" sx={{
                    textAlign: 'center',
                    fontWeight: 600,
                    mb: 1
                }}>
                    {locale && name[locale]}
                </Typography>

                <Divider sx={{ width: '50%', mb: 1 }} />

                <Typography variant="body2" color="text.secondary" sx={{
                    fontSize: '0.8em',
                    textAlign: 'center',
                    minHeight: '5em',
                    mb: 1
                }}>
                    {formattedIngredients.join(', ')}.
                </Typography>

                <Box display="flex" alignItems="center">
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: '0.8em',
                            fontWeight: 600,
                            mr: 2
                        }}
                    >
                        €{price}
                    </Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddToCart}
                        sx={{
                            width: '140px',
                            height: '50px',
                            fontSize: '0.8em',
                            fontWeight: 600,
                            lineHeight: 'normal',
                            textAlign: 'left',
                            textTransform: 'none'
                        }}
                    >
                        <ShoppingCart sx={{ color: 'white', mr: 1 }} />
                        
                        {translation('addToCart')}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default ProductCard
