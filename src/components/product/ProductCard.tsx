import { FC } from 'react'
import { useDispatch } from 'react-redux'

import { useRouter } from 'next/router'

import {
    Card,
    CardActionArea,
    CardContent, CardMedia,
    Typography
} from '@mui/material'

import { addToCart } from '@/slices/cartSlice'
import { setScrollToCart } from '@/slices/scrollSlice'

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

    const handleAddToCart = () => {
        dispatch(addToCart({ product, quantity: 1 }))
        dispatch(setScrollToCart(true))
    }

    return (
        <Card sx={{
            borderRadius: '20px',
            overflow: 'visible',
            mt: 12
        }}>
            <CardActionArea onClick={handleAddToCart}>
                <CardContent sx={theme => ({
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: { xs: '150px', sm: '300px', md: '300px', lg: '250px' },
                    borderRadius: '20px',
                    backgroundColor: 'secondary.main',
                    boxShadow: `0px 4px 4px 0px ${theme.palette.secondary.main}`
                })}>
                    <CardMedia
                        image={imageUrl}
                        component="img"
                        sx={{
                            minWidth: '80px',
                            minHeight: '80px',
                            maxHeight: '150px',
                            maxWidth: '150px',
                            marginTop: '-75px',
                            mb: 1
                        }}
                    />

                    <Typography variant="body2" sx={{
                        textAlign: 'center',
                        fontWeight: 600,
                        mb: 1,
                        fontSize: { xs: '0.9em', sm: '0.95em', md: '1.05em' }
                    }}>
                        {locale && name[locale]}
                    </Typography>

                    <Typography variant="body2" sx={{
                        mb: 1,
                        fontSize: { xs: '0.9em', sm: '0.95em', md: '1.05em' }
                    }}>
                        € {price}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{
                        textAlign: 'center',
                        fontSize: { xs: '0.9em', sm: '0.95em', md: '1.05em' }
                    }}>
                        {formattedIngredients.join(', ')}.
                    </Typography>

                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default ProductCard
