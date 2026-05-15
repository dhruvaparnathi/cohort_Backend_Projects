import { createContext, useState } from "react";
import { getFeed } from "./services/post.api";

export const PostContext = createContext();

export function PostProvider({ children }){

    const [post, setPost] = useState(null);
    const [feed, setFeed] = useState([]);
    const [userPosts, setUserPosts] = useState(null);
    const [loading, setLoading] = useState(false);


    return (
        <PostContext.Provider value={{ post, setPost, feed, setFeed, userPosts, setUserPosts, loading, setLoading }}>
            {children}
        </PostContext.Provider>
    )
}