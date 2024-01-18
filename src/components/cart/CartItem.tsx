import { ChangeEvent, FC } from 'react'
import { useDispatch } from 'react-redux'

import Image from 'next/image'
import { useRouter } from 'next/router'

import { Delete } from '@mui/icons-material'
import {
    Box,
    IconButton,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Theme,
    Typography,
    useMediaQuery
} from '@mui/material'

import { changeQuantity, removeFromCart } from '@/slices/cartSlice'

import CartItemType from '@/types/CartItem.type'

type CartItemProps = {
    item: CartItemType
}

const CartItem: FC<CartItemProps> = ({ item }) => {
    const { product, quantity } = item

    const { locale } = useRouter()
    const dispatch = useDispatch()

    const isMobileOrTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

    const handleRemoveFromCart = () => dispatch(removeFromCart(product.id))

    const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) =>
        dispatch(changeQuantity({ id: product.id, quantity: +event.target.value }))

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
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

            <Box display="flex" flexDirection="row" sx={{
                mt: { xs: 0.5, sm: 0.7, md: 0.2, lg: 0 }
            }}>
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

                <TextField
                    type="number"
                    inputProps={{ min: 1 }}
                    value={quantity}
                    onChange={handleQuantityChange}
                    sx={{
                        textAlign: 'center',
                        backgroundColor: 'primary.main',
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        "& .MuiInputBase-input": {
                            textAlign: 'center',
                            paddingTop: { xs: 1.4, sm: 1.2 },
                            fontSize: { xs: '0.75em', sm: '0.8em', md: '0.85em', lg: '0.9em' }
                        },
                        "& .MuiInputBase-input::-webkit-inner-spin-button, & .MuiInputBase-input::-webkit-outer-spin-button": {
                            "-webkit-appearance": "none",
                            margin: 0
                        },
                        "& .MuiInputBase-input[type=number]": {
                            "-moz-appearance": "textfield"
                        },
                        "& fieldset": {
                            border: 'none'
                        }
                    }}
                />
            </Box>
        </Box>
    )
}

export default CartItem
