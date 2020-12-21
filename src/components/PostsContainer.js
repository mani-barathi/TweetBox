import React, { useState, useEffect } from 'react'
import FlipMove from 'react-flip-move';
import Post from "./Post"
import { db } from "../firebase"

function PostsContainer() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        let unsubscribe = db.collection('postss').orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setPosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })
                ))
            })

        return () => {
            unsubscribe()
            console.log('unsubscribed!!! from Home page')
        }

    }, [])

    const styles = {
        width: "100%",
        maxWidth: "600px",
        display: "flex",
        justifyContent: "center"
    }

    return (
        <div className="mt-3" style={styles}>
            <div className="col">

                <FlipMove >
                    {
                        posts.map(post =>
                            <Post key={post.id} post={post} isMyPostPage={false} />
                        )
                    }
                </FlipMove>

            </div>
        </div>
    )
}

export default PostsContainer
