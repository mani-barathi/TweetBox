import { useState, useContext, } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from "./components/Navbar"
import Login from "./components/Login"
import PostsContainer from "./components/PostsContainer"
import PostForm from "./components/PostForm"
import MyPosts from "./components/MyPosts"

import { UserContext } from "./context/userContext"

function App() {
  const [user] = useContext(UserContext)
  const [showPostForm, setShowPostForm] = useState(false)

  return (
    <div className="app bg-light">

      <Router >
        <Navbar setShowPostForm={setShowPostForm} />
        <div className="container">
          {
            (user) ? (
              <div className="row justify-content-center">
                <div className="col" style={{ maxWidth: "600px" }}>
                  {showPostForm && <PostForm setShowPostForm={setShowPostForm} />}



                  <Switch>
                    <Route exact path="/" >
                      <PostsContainer />
                    </Route>

                    <Route>
                      <MyPosts path="/myposts" setShowPostForm={setShowPostForm} />
                    </Route>
                  </Switch>

                </div>
              </div>
            ) : (
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    <Login />
                  </div>
                </div>
              )
          }
        </div>
      </Router>

    </div>
  );
}

export default App;
