import { FC } from 'react'
import { useDispatch } from 'react-redux'

import Image from 'next/image'
import { useRouter } from 'next/router'

import { Box, IconButton, Typography } from '@mui/material'
import { Delete, Add, Remove } from '@mui/icons-material'

import { changeQuantity, removeFromCart } from '@/slices/cartSlice'

import CartItemType from '@/types/CartItem.type'

type CartItemProps = {
    item: CartItemType
}

const CartItem: FC<CartItemProps> = ({ item }) => {
    const { product, quantity } = item

    const { locale } = useRouter()
    const dispatch = useDispatch()

    const handleRemoveFromCart = () => dispatch(removeFromCart(product.id))

    const handleQuantityChange = (quantity: number) =>
        dispatch(changeQuantity({ id: product.id, quantity }))

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            height: 'auto',
            alignItems: 'center',
            mb: 2
        }}>
            <Image
                src={product.imageUrl}
                alt="Cart item"
                width={40}
                height={40}
            />

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                ml: 1,
                flexGrow: 1,
            }}>
                <Typography variant="body2" sx={{
                    fontWeight: 600,
                    fontSize: { xs: '0.75em', sm: '0.75em', md: '0.88em' },
                    mb: { md: 0.5, xs: 0 }
                }}>
                    {locale && product.name[locale]}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{
                    fontSize: { xs: '0.75em', sm: '0.88em' },
                    mb: { md: 1, xs: 0 }
                }}>
                    €{product.price}
                </Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <IconButton
                    onClick={handleRemoveFromCart}
                    sx={{
                        color: 'red',
                        border: '1px solid red',
                        borderRadius: '10px',
                        width: { xs: '30px', sm: '32px', md: '35px', lg: '40px' },
                        height: { xs: '30px', sm: '32px', md: '35px', lg: '40px' },
                        mr: 1
                    }}
                >
                    <Delete fontSize="small" />
                </IconButton>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'primary.main',
                    width: 'auto',
                    height: { xs: '30px', sm: '32px', md: '35px', lg: '40px' },
                    borderRadius: '10px'
                }}>
                    <IconButton
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity === 1}
                        sx={{ padding: '5px' }}
                    >
                        <Remove fontSize="small" sx={{
                            color: 'text.secondary',
                            fontSize: { xs: '0.4em', sm: '0.5em', md: '0.55em', lg: '0.6em' }
                        }} />
                    </IconButton>

                    <Typography color="text.primary" variant="body2" sx={{
                        fontSize: { xs: '0.7em', sm: '0.75em', md: '0.8em', lg: '0.85em' }
                    }}>
                        {quantity}
                    </Typography>

                    <IconButton
                        onClick={() => handleQuantityChange(quantity + 1)}
                        sx={{ padding: '5px' }}
                    >
                        <Add fontSize="small" sx={{
                            color: 'text.secondary',
                            fontSize: { xs: '0.4em', sm: '0.5em', md: '0.55em', lg: '0.6em' }
                        }} />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}

export default CartItem
