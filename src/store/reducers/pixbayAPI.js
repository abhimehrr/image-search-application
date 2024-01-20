import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'pixabayAPI',
    initialState: {
        images: []
    },
    reducers: {
        setImages: (s, a) => {
            s.images = a.payload
        }
    }
})

export const { setImages } = slice.actions
export default slice.reducer