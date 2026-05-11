import { useEffect } from "react";
import Post from "../components/Post";
import "../styles/feed.scss";
import { usePost } from "../hooks/usePost";
import Nav from "../../shared/components/Nav";

const Feed = () => {

    const { feed, loading, handleGetFeed } = usePost();

      useEffect(()=>{
        handleGetFeed()
    }, []);

    if(loading || !feed){
        return (
            <main><h1>Feed is Loading...</h1>
            <h1>If you are not Login.</h1>
            <h2><a href="/login">Login Page</a></h2>
          </main>
        )
    }

  return (
    <>
    <Nav />
    <div className="feed">
      <div className="feed-container">
        {feed.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
    </>
  );
};

export default Feed;