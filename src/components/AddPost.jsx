import axios from 'axios'
import React, { useState } from 'react'

function AddPost({onAddPost, currentCatImage, setCurrentCatImage, usedImages, onDeletePost}) {

    const [customTitle, setCustomTitle] = useState("")
    
    const handleAddClick = () => {
        axios
        .get("https://cataas.com/cat")
        .then(response => {
            const newImage = response.data
            if(!usedImages.includes(newImage)){
                setCurrentCatImage(newImage)
            
                const newPost = {
                    id: Date.now(), title: customTitle, description: "", image: newImage
                }

                onAddPost(newPost, newImage)
                setCustomTitle("")
                
            }else{
                alert("Это изображение уже есть, выберите другое!")
            }
        }).catch(error => {
            console.error('Ошибка при загрузке изображения', error);
        })
    }



    const handleTitleChange = (e) => {
        setCustomTitle(e.target.value)
        setCurrentCatImage("https://cataas.com/cat")
    }

    return (
        <form>
            <h2>Добавить пост</h2>
            <input className='input-container' type="text" value={customTitle} onChange={handleTitleChange}/>
            <div className='image-cats'>
                <img className='cats' src={currentCatImage} alt="cat"/>
            </div>
            <button className='btn-add' onClick={handleAddClick}>Add post</button>
        </form>
    )
}

export default AddPost
