import { useEffect } from "react";
import Post from "../components/Post";
import "../styles/feed.scss";
import { usePost } from "../hooks/usePost";
import { useAuth } from "../../auth/hooks/useAuth";
import Nav from "../../shared/components/Nav";
import Loader from "../../shared/components/Loader";

const Feed = () => {

    const { feed, loading, handleGetFeed } = usePost();
    const { handleGetFollowings, handleGetFollowRequests, handleGetPendingRequests } = useAuth();

      useEffect(()=>{
        handleGetFeed();
        handleGetFollowings();
        handleGetFollowRequests();
        handleGetPendingRequests();
    }, []);

    if(loading || !feed){
        return <Loader message="Loading your feed..." />
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