import { FC } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import {
    Dialog, DialogTitle, DialogContent,
    DialogContentText, DialogActions, Button
} from '@mui/material'

import { Warning } from '@mui/icons-material'

import { RootState } from '@/store'

import { hideAlert } from '@/slices/alertSlice'

const AlertDialog: FC = () => {
    const dispatch = useDispatch()
    const { isOpen, message } = useSelector((state: RootState) => state.alert)

    const handleClose = () => dispatch(hideAlert())

    return (
        <Dialog open={isOpen} onClose={handleClose} PaperProps={{
            sx: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '300px',
                borderRadius: '10px',
                p: 1
            }
        }}>
            <DialogTitle sx={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: 600,
            }}>
                <Warning color="warning" sx={{ mr: 1 }} /> Avviso!
            </DialogTitle>

            <DialogContent>
                <DialogContentText sx={{ fontSize: '0.9em', textAlign: 'center' }}>
                    {message}
                </DialogContentText>
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'center', pt: 0 }}>
                <Button onClick={handleClose} color="primary" autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertDialog
