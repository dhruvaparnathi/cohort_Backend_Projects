import { getFeed } from "../services/feed.api";
import { useContext } from "react";
import { PostContext } from "../Post.context";

export const usePost = ()=>{

    const context = useContext(PostContext);

    const { post, setPost, feed, setFeed, loading, setLoading } = context

    const handleGetFeed = async () => {

        setLoading(true);
        const data = await getFeed();
        setFeed(data.posts);
        setLoading(false); 
    }

    return { loading, feed, post, handleGetFeed }
}
