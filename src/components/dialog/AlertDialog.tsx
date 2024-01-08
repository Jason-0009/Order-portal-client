import { FC } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { useTranslation } from 'next-i18next'

import {
    Dialog, DialogTitle, DialogContent,
    DialogContentText, DialogActions, Button
} from '@mui/material'

import { Warning } from '@mui/icons-material'

import { RootState } from '@/store'

import { hideAlert } from '@/slices/dialog/alertDialogSlice'

const AlertDialog: FC = () => {
    const dispatch = useDispatch()
    const { isOpen, message } = useSelector((state: RootState) => state.alertDialog)
    const { t: translation } = useTranslation()

    const handleClose = () => dispatch(hideAlert())

    return (
        <Dialog open={isOpen} onClose={handleClose} PaperProps={{
            sx: {
                backgroundColor: 'secondary.main',
                backgroundImage: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
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
                <Warning color="warning" sx={{ mr: 1 }} /> {translation('alert')}
            </DialogTitle>

            <DialogContent>
                <DialogContentText sx={{
                    fontSize: '0.9em',
                    color: 'text.secondary',
                    textAlign: 'center',
                    mb: '-0.6em'
                }}>
                    {message}
                </DialogContentText>
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'center', pt: 0 }}>
                <Button
                    onClick={handleClose}
                    color="info"
                    sx={{ borderRadius: '20px' }}
                    autoFocus
                >
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertDialog
