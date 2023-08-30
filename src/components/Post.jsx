import React, { useState } from 'react'

function Post({post, currentCatImage, description, onEditPost, onDeletePost}) {


    const [editing, setEditing] = useState(false)
    const [customTitle, setCustomTitle] = useState(post.title)
    const [customDescription, setCustomDescription] = useState(description)

    const handleEditClick = () => setEditing(true)
    const handleSaveClick = () => {
        onEditPost(post.id, {title: customTitle, description: customDescription})
        setEditing(false)
    }

    const handleDeleteClick = () => onDeletePost(post.id)

    return (
        <div>
            <div>
                <div className='image-cats'>
                    <img className='cats' src={currentCatImage} alt="cat" />
                </div>
                <div>
                    <h2>{customTitle}</h2>
                    <p>{customDescription}</p>
                </div>
                <div className='post-card'>
                    <button className='post-title' onClick={handleEditClick}>edit</button>
                    <button className='btn-delete' onClick={handleDeleteClick}>DELETE</button>
                </div>
            </div>

            {
                editing && (
                    <div>
                        <input className='input-container' type="text" value={customTitle} onChange={e => setCustomTitle(e.target.value)}/>
                        <textarea value={customDescription} onChange={e => setCustomDescription(e.target.value)}>
                        </textarea>
                        <button onClick={handleSaveClick}>SAVE</button>
                    </div>
                )
            }
        </div>
    )
}

export default Post
