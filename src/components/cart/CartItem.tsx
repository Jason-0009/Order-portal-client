import { FC } from 'react'
import { useDispatch } from 'react-redux'

import { useRouter } from 'next/router'
import Image from 'next/image'

import {
    Box, Typography, Select, MenuItem,
    SelectChangeEvent, IconButton, useTheme, useMediaQuery
} from '@mui/material'
import { Delete } from '@mui/icons-material'

import { changeQuantity, removeFromCart } from '@/slices/cartSlice'

import CartItemType from '@/types/CartItem.type'

type CartItemProps = {
    item: CartItemType
}

const CartItem: FC<CartItemProps> = ({ item }) => {
    const { product, quantity } = item

    const { locale } = useRouter()
    const dispatch = useDispatch()

    const theme = useTheme()
    const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'))

    const handleRemoveFromCart = () => dispatch(removeFromCart(product.id))

    const handleQuantityChange = (event: SelectChangeEvent<number>) =>
        dispatch(changeQuantity({ id: product.id, quantity: +event.target.value }))

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: isMobileOrTablet ? 'column' : 'row',
            height: 'auto',
            mb: 4
        }}>
            <Image
                src={product.imageUrl}
                alt="Cart item"
                width={40}
                height={40}
                style={{
                    marginRight: isMobileOrTablet ? 0 : '10px',
                    marginBottom: isMobileOrTablet ? '5px' : 0
                }}
            />

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
            }}>
                <Typography variant="body2" sx={{
                    fontWeight: 600,
                    fontSize: { xs: '0.75em', sm: '0.75em', md: '0.88em' },
                    mb: isMobileOrTablet ? 0.5 : 0
                }}>
                    {locale && product.name[locale]}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{
                    fontSize: { xs: '0.75em', sm: '0.88em' },
                    mb: isMobileOrTablet ? 1 : 0
                }}>
                    €{product.price}
                </Typography>
            </Box>

            <Box display="flex" flexDirection="row">
                <IconButton
                    onClick={handleRemoveFromCart}
                    sx={{
                        color: 'red',
                        border: '1px solid red',
                        borderRadius: '10px',
                        width: '40px',
                        height: '40px',
                        mr: 1
                    }}
                >
                    <Delete fontSize="small" />
                </IconButton>

                <Select
                    value={quantity}
                    onChange={handleQuantityChange}
                    sx={{
                        backgroundColor: 'primary.main',
                        width: '50px',
                        height: '40px',
                        pr: '5px',
                        textAlign: 'left',
                        borderRadius: '10px',
                        "& fieldset": {
                            border: 'none'
                        }
                    }}
                    SelectDisplayProps={{
                        style: {
                            fontWeight: 600,
                            fontSize: isMobileOrTablet ? '0.7em' : '0.8em'
                        }
                    }}
                >
                    {[...Array(9).keys()].map((value, index, array) => {
                        const isFirstItem = index === 0
                        const isLastItem = index === array.length - 1

                        return (
                            <MenuItem
                                key={value}
                                value={value + 1}
                                sx={{
                                    backgroundColor: 'secondary.main',
                                    fontSize: { xs: '0.7em', sm: '0.8em' },
                                    '&.MuiMenuItem-root': {
                                        marginTop: isFirstItem ? '-0.6em' : 'auto',
                                        marginBottom: isLastItem ? '-0.6em' : 'auto'
                                    }
                                }}
                            >
                                {value + 1}
                            </MenuItem>
                        )
                    })}
                </Select>
            </Box>
        </Box>
    )
}

export default CartItem
