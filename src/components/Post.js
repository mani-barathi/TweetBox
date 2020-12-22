import React, { forwardRef, useState } from 'react'
import "./css/Post.css"
import { db, storage } from "../firebase"
import PostEditForm from './PostEditForm'

const Post = forwardRef(({ post, isMyPostPage }, ref) => {
    const [showEditPostForm, setshowEditPostForm] = useState(false)
    const handleDeletePost = () => {
        // make a copy of Tweet image name
        const postImage = post.data.imageName

        db.collection('postss').doc(post.id).delete()
            .then(() => {
                if (postImage) {  // if there is a image then delete the image from CloudStorage
                    storage.ref('images').child(postImage)
                        .delete()
                        .then(() => console.log('Tweet Along with Image is deleted!'))
                        .catch((error) => {
                            alert(error.message)
                            console.log(error.message)
                        })
                }
            })
            .catch((error) => {
                alert(error.message)
                console.log(error.message)
            })
    }

    return (
        <div className="post mt-3 mb-3" ref={ref}>
            <div className="post__header">
                <div className="post__avator">
                    <img className="rounded-circle ml-1" src={post.data.authorPhotoURL} alt="" />
                </div>
                <div className="post__author">
                    <h6>{post.data.author}</h6>
                    {isMyPostPage &&
                        <div>
                            <button onClick={handleDeletePost} className="btn text-danger shadow-none border-0" title="Delete Tweet">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z" />
                                </svg>
                            </button>
                            <button onClick={() => setshowEditPostForm(true)} className="btn text-info shadow-none border-0" title="Delete Tweet">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                </svg>
                            </button>
                        </div>
                    }
                </div>
            </div>
            <div className="post__image">
                {post.data.imageUrl && <img src={post.data.imageUrl} alt={`${post.data?.author} has upload a Pic `} />}
            </div>
            <div className="post__caption">
                <p className="mb-0">{post.data.text}</p>
                <small className="text-muted font-weight-bold" style={{ fontSize: "x-small", userSelect: "none" }}>
                    {post.data.timestamp?.toDate().toString().substring(0, 21)}
                </small>
            </div>
            {showEditPostForm && <PostEditForm post={post} setshowEditPostForm={setshowEditPostForm} />}
        </div>
    )
})

export default Post
