import React, { useState, useContext, useEffect } from 'react'
import FlipMove from "react-flip-move"
import Post from "./Post"
import { db } from "../firebase"
import { UserContext } from '../context/userContext'

function MyPosts({ setShowPostForm }) {
    const [user] = useContext(UserContext)
    const [myPosts, setMyPosts] = useState([])

    useEffect(() => {
        let unsubscribe = db.collection('postss').where("authorEmail", "==", user.email)
            .orderBy('timestamp', 'desc')
            .onSnapshot(
                (snapshot) => {
                    setMyPosts(
                        snapshot.docs.map(doc => ({
                            id: doc.id,
                            data: doc.data()
                        }))
                    )  //closing setMyPosts
                })  // closing snapshot

        return () => {
            unsubscribe()
            console.log('unsubscribed!!! from MyPosts page')
        }
    }, [user])


    const styles = {
        width: "100%",
        maxWidth: "600px",
        display: "flex",
        justifyContent: "center"
    }

    return (
        <div className="mt-3" style={styles}>
            <div className="col">
                <h3>My Posts</h3>
                <hr />
                <FlipMove >
                    {/* If there is No Posts */}
                    {myPosts.length === 0 &&
                        <p className="text-center"> You haven't Posted any Tweet. Click &nbsp;
                            <span onClick={() => { setShowPostForm(true) }} className="text-primary"
                                style={{ cursor: "pointer" }}>
                                here
                            </span>
                            &nbsp; to Tweet Now
                        </p>}

                    {/* Rendering Posts  */}
                    {myPosts.map(post =>
                        <Post key={post.id} post={post} isMyPostPage={true} />
                    )
                    }
                </FlipMove>

            </div>
        </div>
    )
}

export default MyPosts
