import { useEffect, useState } from 'react'
import axios from 'axios'
import Post from './components/Post'
import AddPost from './components/AddPost'

function App() {
  const [customPosts, setCustomPosts] = useState([])
  const [customCatImage, setCustomCatImage] = useState("")
  const [customUsedImages, setCustomUsedImages] = useState([])

useEffect(() => {
  axios
  .get("https://cataas.com/cat") 
  .then(({data:newImage}) => {
    setCustomCatImage(newImage)
  })
  .catch(error => {
    console.error('Ошибка', error)
  })
},[])

  const addCustomPost = (newPost, newImage) => {
    setCustomPosts(posts => [...posts, newPost])
    setCustomCatImage(newImage)
    setCustomUsedImages(images => [...images, newImage])
  }

  const editCustomPost = (postId, updatedPost) => {
    setCustomPosts(posts => 
      posts.map(post => post.id === postId ? {...post, ...updatedPost} : post)
      )
  }


  const deleteCustomPost = postId => {setCustomPosts(posts => posts.filter(post => post.Id !== postId))}
  

  return (
    <>
    <main>
      <h2>RANDOM CATS</h2>
      <AddPost
      onAddPost = {addCustomPost}
      currentCatImage = {customCatImage}
      setCurrentCatImage = {setCustomCatImage}
      usedImages = {customUsedImages}
      />
      </main>
      <div className='post-container'>
      {
        customPosts.map(post => (
          <Post
            key={post.id}
            post = {post}
            currentCatImage = {post.image}
            description = {post.description}
            onEditPost = {editCustomPost}
            onDeletePost = {deleteCustomPost}
          />
        ))
      }
      </div>

    </>
  )
}

export default App
