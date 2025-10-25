import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'

import { sortBlogs } from '../reducers/blogReducer'
import Toggable from './Toggable'
import CreateBlogForm from './CreateBlogForm'
import { useRef } from 'react'
import { OrderButtonContainer, StyledButton, Wrapper } from './StyledComponents'

const BlogList = () => {
  const blogs = useSelector((store) => store.blogs)
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()

  const createBlogFormRef = useRef()

  const sortByLikesHighest = () => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    dispatch(sortBlogs(sortedBlogs))
  }

  const sortByLikesLowest = () => {
    const sortedBlogs = [...blogs].sort((a, b) => a.likes - b.likes)
    dispatch(sortBlogs(sortedBlogs))
  }

  return (
    <Wrapper>
      <h2>Blogs</h2>

      {user && (
        <div>
          <Toggable buttonLabel="new blog" ref={createBlogFormRef}>
            <CreateBlogForm createBlogFormRef={createBlogFormRef} />
          </Toggable>
        </div>
      )}

      <OrderButtonContainer className="button-order">
        <StyledButton type="button" onClick={sortByLikesHighest}>
          Order by likes (highest first)
        </StyledButton>
        <StyledButton type="button" onClick={sortByLikesLowest}>
          Order by likes (lowest first)
        </StyledButton>
      </OrderButtonContainer>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </Wrapper>
  )
}

export default BlogList
