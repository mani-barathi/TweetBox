import React, { forwardRef } from 'react'
import "./css/Post.css"
import { db, storage } from "../firebase"

const Post = forwardRef(({ post, isMyPostPage }, ref) => {

    const handleDeletePost = () => {
        // make a copy of Tweet image name
        const postImage = post.data.imageName

        db.collection('postss').doc(post.id).delete()
            .then(() => {
                if (postImage) {  // if there is a image then delete the image from CloudStorage
                    storage.ref('images').child(postImage)
                        .delete()
                        .then(() => console.log('deleted!'))
                        .catch((error) => {
                            alert(error.message)
                            console.log(error.message)
                        })
                }
            })
    }

    return (
        <div className="post mt-3 mb-3" ref={ref}>
            <div className="post__header">
                <div className="post__avator">
                    <img className="rounded-circle ml-1" src="https://image.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-1745180411.jpg" alt="" />
                </div>
                <div className="post__author">
                    <h6>{post.data.author}</h6>
                    {isMyPostPage &&
                        <button onClick={handleDeletePost} className="btn text-danger shadow-none border-0" title="Delete Tweet">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z" />
                            </svg>
                        </button>
                    }
                </div>
            </div>
            <div className="post__image">
                {post.data.imageUrl && <img src={post.data.imageUrl} alt={`${post.data?.author} has upload a Pic `} />}
            </div>
            <div className="post__caption">
                <p className="mb-0">{post.data.text}</p>
                <small className="text-muted font-weight-bold" style={{ fontSize: "x-small" }}>
                    {post.data.timestamp?.toDate().toString().substring(0, 21)}
                </small>
            </div>
        </div>
    )
})

export default Post
