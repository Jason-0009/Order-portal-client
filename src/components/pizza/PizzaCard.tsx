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
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <CardMedia
                    image={pizza.imageUrl}
                    component="img"
                    alt={`Pizza ${pizza.name.toLowerCase()}`}
                    sx={{ height: '120px', width: '120px' }}
                />

                <Typography variant="h6" component="div" sx={{
                    textAlign: 'center',
                    fontWeight: 600,
                    mb: 1
                }}>
                    {pizza.name}
                </Typography>

                <Divider sx={{ width: '50%', mb: 1 }} />

                <Typography variant="body2" color="text.secondary" sx={{
                    fontSize: '0.7em',
                    textAlign: 'center',
                    minHeight: '3em',
                    mb: 1
                }}>
                    {ingredients.join(', ')}
                </Typography>

                <Box display="flex" alignItems="center">
                    <Typography
                        variant="body2"
                        sx={{ fontSize: '0.8em', mr: 2 }}
                    >
                        €{pizza.price}
                    </Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddToCart}
                        sx={{
                            width: '120px',
                            height: '50px',
                            fontSize: '0.7em',
                            fontWeight: 600,
                            lineHeight: 'normal',
                            textAlign: 'left',
                            textTransform: 'none'
                        }}
                    >
                        <ShoppingCartIcon sx={{ color: 'white', mr: 1 }} />
                        Aggiungi al carrello
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default PizzaCard
