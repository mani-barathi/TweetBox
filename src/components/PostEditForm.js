import React, { useRef } from 'react'
import './css/PostForm.css'

import { db } from "../firebase"

function PostEditForm({ post, setshowEditPostForm }) {
    const textAreaRef = useRef(post.data.text)

    const handlePostEditForm = (event) => {
        event.preventDefault()
        const text = textAreaRef.current.value
        db.collection('postss').doc(post.id).update({
            text: text
        })
        setshowEditPostForm(false)
    }

    return (
        <div className="postForm" >
            <div className="postForm__wrapper w-100 shadow-lg bg-light" >
                <div className="d-flex justify-content-between align-items-center">
                    <h4>Edit Post</h4>
                    <button onClick={() => setshowEditPostForm(false)}
                        className="btn font-weight-bold border-dark btn-sm px-2 py-1">X</button>
                </div>
                <form onSubmit={handlePostEditForm} className="mt-2">
                    <div className="form-group">
                        {post.data.imageUrl &&
                            <center>
                                <p className=" py-0 mb-0">{post.data.imageName}</p>
                                <small className="text-muted ">Cannot Upload or Change an Uploded Image</small>
                            </center>
                        }
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" rows="5"
                            ref={textAreaRef} defaultValue={post.data.text} required >
                        </textarea>
                        <button className="mt-2 btn btn-sm bg-dark text-light shadow float-right">Update</button>
                    </div>
                    <small className="text-muted ">Posted on {post.data.timestamp?.toDate().toString().substring(0, 21)}</small>
                </form>
            </div >
        </div>
    )
}

export default PostEditForm
