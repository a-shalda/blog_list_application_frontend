
const BlogContent = ({ viewBlog, blog, toggleViewBlog, buttonLabel, likes, addLike, showDelete }) => {

  const content = (
    !viewBlog ?
      <div className='blog'>
        <p>{blog.title} by {blog.author} <button onClick={toggleViewBlog}>{buttonLabel}</button></p>
      </div> :
      <div className='blog blogView'>
        <p>{blog.title} by {blog.author} <button onClick={toggleViewBlog}>{buttonLabel}</button></p>
        <p>{blog.url}</p>
        <p>Likes: {likes}
          <button onClick={addLike}>like</button>
        </p>
        <p>{blog.user.name}</p>
        {showDelete}
      </div>
  )

  return content
}

export default BlogContent