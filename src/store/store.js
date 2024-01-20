import { configureStore } from '@reduxjs/toolkit'

import pixabayAPI from './reducers/pixbayAPI'

export default configureStore({
    reducer: {
        pixabayAPI
    }
})