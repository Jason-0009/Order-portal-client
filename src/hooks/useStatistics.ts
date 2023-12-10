import { useQuery } from 'react-query'

import fetchOrdersStatistics from '@/api/order/fetchOrderStatistics'

const useStatistics = () => useQuery('statistics', fetchOrdersStatistics)

export default useStatistics
