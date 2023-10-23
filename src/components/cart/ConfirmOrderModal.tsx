import { FC } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import {
    Dialog, DialogTitle,
    DialogContent, DialogContentText,
    Typography, Button, DialogActions
} from '@mui/material'

import { RootState } from '@/store'

import { closeConfirmOrderModal } from '@/slices/confirmOrderModalSlice'

const ConfirmOrderModal: FC = () => {
    const dispatch = useDispatch()

    const isOpen = useSelector((state: RootState) => state.orderModal.isOpen)
    const cart = useSelector((state: RootState) => state.cart)

    const totalPrice = cart.reduce((sum, item) => sum + item.pizza.price * item.quantity, 0)

    const handleClose = () => dispatch(closeConfirmOrderModal())

    return (
        <Dialog open={isOpen} onClose={handleClose} PaperProps={{
            sx: {
                pt: 1,
                pb: 3,
                pl: 2,
                pr: 3,
                borderRadius: '15px'
            }
        }}>
            <DialogTitle sx={{ fontWeight: 600 }}>
                Vuoi confermare il tuo ordine?
            </DialogTitle>

            <DialogContent>
                <DialogContentText sx={{ fontSize: '0.9em' }}>
                    L'ordine andrà ad ammontare a <Typography component="span" sx={{ fontSize: '0.9em', fontWeight: 'bold' }}>
                        €{totalPrice}
                    </Typography>.
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={handleClose}
                    sx={{ textTransform: 'none ' }}
                >
                    Cancella
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClose}
                    autoFocus
                    sx={{ textTransform: 'none ' }}
                >
                    Conferma
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmOrderModal
