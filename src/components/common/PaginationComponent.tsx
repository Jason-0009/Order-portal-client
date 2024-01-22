import { ChangeEvent, FC } from 'react'

import { Box, Pagination, SxProps } from '@mui/material'

type PaginationComponentProps = {
    count: number | undefined,
    page: number,
    onChange: (event: ChangeEvent<unknown>, page: number) => void,
    color?: 'primary' | 'secondary',
    sx?: SxProps
}

const PaginationComponent: FC<PaginationComponentProps> = ({ count, page, onChange, color, sx }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, ...sx }}>
            <Pagination
                color={color}
                count={count}
                page={page}
                onChange={onChange}
                sx={{
                    '& .MuiPaginationItem-root': {
                        fontSize: { xs: '0.7rem', sm: '0.75em', md: '0.78em', lg: '0.8rem' }
                    }
                }}
            />
        </Box>
    )
}

export default PaginationComponent
