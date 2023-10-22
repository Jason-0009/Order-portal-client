import { FC } from 'react'
import { useDispatch } from 'react-redux'

import { Card, CardContent, CardMedia, Typography, Divider, Box, Button } from '@mui/material'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import { addToCart } from '@/slices/cartSlice'

type PizzaCardProps = {
    pizza: Pizza
}

const PizzaCard: FC<PizzaCardProps> = ({ pizza }) => {
    const dispatch = useDispatch()

    const ingredients = pizza.ingredients.map((ingredient, index) =>
        index === 0 ? ingredient : ingredient.toLowerCase()
    )

    const handleAddToCart = () => dispatch(addToCart({ pizza, quantity: 1 }))

    return (
        <Card sx={{ boxShadow: 'none' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardMedia
                    image={pizza.imageUrl}
                    component="img"
                    alt={`Pizza ${pizza.name.toLowerCase()}`}
                    sx={{ height: '150px', width: '150px' }}
                />

                <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                    {pizza.name}
                </Typography>

                <Divider sx={{ width: '50%', mb: 1 }} />

                <Typography variant="body2" color="text.secondary" sx={{
                    fontSize: '0.8em', textAlign: 'center', mb: 2
                }}>
                    {ingredients.join(', ')}
                </Typography>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.primary" sx={{ mr: 2 }}>
                        € {pizza.price}
                    </Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ShoppingCartIcon sx={{ color: 'white' }} />}
                        sx={{ textTransform: 'none' }}
                        onClick={handleAddToCart}>
                        Aggiungi al carrello
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default PizzaCard
