import { configureStore } from '@reduxjs/toolkit'
import AuthReduser from './features/auth'
import AtricleSlice from './features/article'

export const store = configureStore({
	reducer: {
		auth: AuthReduser,
		article: AtricleSlice,
	},
	devTools: process.env.NODE_ENV !== 'production',
})
