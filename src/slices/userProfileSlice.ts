import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import User from '@/types/user/User.type'

type UserProfileState = User | null

const initialState = null as UserProfileState

const userProfileSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserProfile: (state, action: PayloadAction<User>) => state = action.payload
    }
})

export const { setUserProfile } = userProfileSlice.actions

export default userProfileSlice.reducer
