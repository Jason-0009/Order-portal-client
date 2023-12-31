import { FC } from 'react'
import { useDispatch } from 'react-redux'

import { useRouter } from 'next/router'
import Image from 'next/image'

import { Box, Button, Typography, Select, MenuItem, SelectChangeEvent } from '@mui/material'

import { changeQuantity, removeFromCart } from '@/slices/cartSlice'

import CartItemType from '@/types/CartItem.type'

type CartItemProps = {
    item: CartItemType
}

const CartItem: FC<CartItemProps> = ({ item }) => {
    const { product, quantity } = item

    const {locale } = useRouter()
    const dispatch = useDispatch()

    const handleRemoveFromCart = () => dispatch(removeFromCart(product.id))
    
    const handleQuantityChange = (event: SelectChangeEvent<number>) =>
        dispatch(changeQuantity({ id: product.id, quantity: +event.target.value }))

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#F7F0F0',
            borderRadius: '20px',
            height: '100px',
            mx: 3,
            my: 1,
            p: 2
        }}>
            <Image src={product.imageUrl} alt="Cart item" width={60} height={60} />

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                ml: 0.5
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 0.5
                }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {locale && product.name[locale]}
                    </Typography>

                    <Typography variant="body2" sx={{ fontSize: '0.8em'}}>
                        €{product.price}
                    </Typography>
                </Box>

                <Box display="flex" flexDirection="row">
                    <Button
                        onClick={handleRemoveFromCart}
                        sx={{
                            fontSize: '0.8em',
                            minWidth: '20px',
                            height: '30px',
                            color: 'grey.500',
                            mr: 1
                        }}
                    >
                        X
                    </Button>

                    <Select
                        value={quantity}
                        onChange={handleQuantityChange}
                        sx={{ height: '30px' }}
                        SelectDisplayProps={{ style: { fontSize: '0.8em' } }}
                    >
                        {[...Array(10).keys()].map(value =>
                            <MenuItem
                                key={value}
                                value={value + 1}
                                sx={{ fontSize: '0.8em' }}
                            >
                                {value + 1}
                            </MenuItem>
                        )}
                    </Select>
                </Box>
            </Box>
        </Box>
    )
}

export default CartItem
