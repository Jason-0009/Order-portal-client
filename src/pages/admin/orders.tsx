import { FC } from 'react'

import { Box } from '@mui/material'

import withAuth from '@/hoc/withAuth'
import withAdminAuth from '@/hoc/withAdminAuth'

import AdminOrdersContent from '@/components/order/admin/AdminOrdersContent'
import AdminOrdersOverview from '@/components/order/admin/AdminOrdersOverview'

const AdminOrdersPage: FC = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ flex: '80%', marginRight: '2%' }}>
                <AdminOrdersContent />
            </Box>

            <Box sx={{ flex: '20%' }}>
                <AdminOrdersOverview />
            </Box>
        </Box>
    )
}

export default withAuth(withAdminAuth(AdminOrdersPage))
