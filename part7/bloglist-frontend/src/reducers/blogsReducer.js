import { createSlice } from '@reduxjs/toolkit'

const blogsReducer = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    newBlog(state, action) {
      state.push(action.payload)
    },
    changeBlog(state, action) {
      const blog = action.payload
      return state.map((b) => (b.id === blog.id ? blog : b))
    },
    removeBlog(state, action) {
      return state.filter((b) => b.id !== action.payload)
    },
  },
})

export const { setBlogs, newBlog, changeBlog, removeBlog } =
  blogsReducer.actions
export default blogsReducer.reducer
