import React, { useState, useContext } from 'react'
import './css/PostForm.css'
import firebase from "firebase"

import { UserContext } from "../context/userContext"
import { db, storage } from "../firebase"

function PostForm({ setShowPostForm }) {
    const [user] = useContext(UserContext)
    const [file, setFile] = useState(null)
    const [postText, setpostText] = useState('')
    const [progress, setProgress] = useState(0)

    const closePostForm = () => {
        setFile(null)
        setpostText('')
        setShowPostForm(false)
    }

    const handlePostForm = (event) => {
        event.preventDefault()
        if (!postText) return
        const data = {
            author: user.displayName,
            authorEmail: user.email,
            authorPhotoURL: user.photoURL,
            text: postText,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }
        // upload if there is file
        if (file) {
            const uploadTask = storage.ref(`images/${file.name}`).put(file);
            uploadTask.on("state_change",
                // On Uploading listen to it and get the progress to it
                (snapshot) => {
                    const progress = Math.round(((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
                    setProgress(progress)
                },
                // Error Funtion it there is any error while uploading handle it here
                (error) => {
                    closePostForm()
                    alert(error.message)
                    console.log(error.message)
                },
                // Complete Function.. get the url of image and push it back to firetore
                () => {
                    storage.ref('images').child(file.name)
                        .getDownloadURL().then((url) => {
                            data.imageUrl = url             // adding the recived Url
                            data.imageName = file.name      // adding the image Name (makes deleting easier)
                            db.collection('postss').add(data)
                            closePostForm()
                        })
                }
            )  // end of uploadTask
        } else {  // if there is no file
            db.collection('postss').add(data)
            closePostForm()
        }
    }

    return (
        <div className="postForm" >
            <div className="postForm__wrapper w-100 shadow-lg bg-light" >
                <div className="d-flex justify-content-between align-items-center">
                    <h4>Post</h4>
                    <button onClick={closePostForm} className="btn font-weight-bold border-dark btn-sm px-2 py-1">X</button>
                </div>
                <form onSubmit={handlePostForm} className="mt-2">
                    <div className="form-group d-flex justify-content-center">
                        <progress value={progress} className="w-75 " max="100"> {progress} </progress>
                    </div>
                    <div className="form-group">
                        <input type="file" onChange={e => setFile(e.target.files[0])}
                            className="form-control form-control-sm" />
                    </div>
                    <div className="form-group">
                        <textarea value={postText} onChange={e => setpostText(e.target.value)}
                            className="form-control" rows="2" placeholder="What's going on.." required >
                        </textarea>
                        <button className="mt-2 btn btn-sm bg-dark text-light shadow float-right">Update</button>
                    </div>
                    <small className="text-muted">* Uploading an Image is not mandatory</small>
                </form>
            </div >
        </div>
    )
}

export default PostForm
