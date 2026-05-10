import { useEffect } from "react";
import Post from "../components/Post";
import "../styles/feed.scss";
import { usePost } from "../hooks/usePost";

const Feed = () => {

    const { feed, loading, handleGetFeed } = usePost();
    
    useEffect(()=>{
        handleGetFeed()
    }, []);

    if(loading || !feed){
        return (
            <main><h1>Feed is Loading...</h1></main>
        )
    }

  return (
    <div className="feed">
      <div className="feed-container">
        {feed.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;