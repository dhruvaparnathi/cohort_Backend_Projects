import { getFeed, createPost, likePost, unlikePost, getAllPosts } from "../services/post.api";
import { useContext } from "react";
import { PostContext } from "../Post.context";

export const usePost = ()=>{

    const context = useContext(PostContext);

    const { post, setPost, feed, setFeed, userPosts, setUserPosts, loading, setLoading } = context

    const handleGetFeed = async () => {

        setLoading(true);
        const data = await getFeed();
        setFeed(data.posts);
        setLoading(false); 
    }

    const handleCreatePost = async (imageFile, caption) => {

        setLoading(true);
        const data = await createPost(imageFile, caption);
        setPost(data.post);
        setFeed([data.post, ...(feed || [])]);
        setLoading(false);
    }

    const handleLikePost = async(postId) => {

        await likePost(postId);
        setFeed((prevFeed) =>
          prevFeed.map((p) =>
            p._id === postId ? { ...p, isLiked: true } : p
          )
        );
    }

    const handleUnLikePost = async(postId) => {

        await unlikePost(postId);
        setFeed((prevFeed) =>
          prevFeed.map((p) =>
            p._id === postId ? { ...p, isLiked: false } : p
          )
        );
    }

    // Despite the name, this should fetch global posts (feed)
    const handleGetAllPosts = async () => {
        setLoading(true);
        const data = await getFeed();
        setUserPosts(data);
        setLoading(false);
    }


    return { loading, feed, post, handleGetFeed, handleCreatePost, handleLikePost, handleUnLikePost, handleGetAllPosts }
}
