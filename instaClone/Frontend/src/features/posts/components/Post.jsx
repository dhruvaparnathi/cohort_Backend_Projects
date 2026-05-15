import React, { useEffect } from "react";
import "../styles/post.scss";


import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { usePost } from "../hooks/usePost";
import { useAuth } from "../../auth/hooks/useAuth";

const Post = ({ post }) => {

  const { loading, handleLikePost, handleUnLikePost } = usePost();
  const { user, followingsData, pendingRequestsData, handleFollowUser, handleUnfollowUser } = useAuth();

  useEffect(() => {
    console.log('pendingRequestsData:', pendingRequestsData);
    console.log('followingsData:', followingsData);
  }, [pendingRequestsData, followingsData]);

  const isOwnPost = user?.username === post.user.username;
  const isFollowing = followingsData?.followings?.some(
    (item) => item.followee?.username === post.user.username
  );
  const hasPendingRequest = pendingRequestsData?.pendingRequests?.some(
    (item) => item.followee?.username === post.user.username
  );

  const getFollowButtonText = () => {
    if (isFollowing) return 'Following';
    if (hasPendingRequest) return 'Pending';
    return 'Follow';
  };

  const handleFollowAction = async () => {
    if (isFollowing) {
      await handleUnfollowUser(post.user.username);
    } else if (!hasPendingRequest) {
      await handleFollowUser(post.user.username);
    }
    // If pending, do nothing (maybe show a message or allow cancel)
  };

  const handleLike = () => {
    if(!post.isLiked){
      handleLikePost(post._id)
      .then((res)=>console.log(res))
    }else{
      handleUnLikePost(post._id)
      .then((res)=>console.log(res))
    }
  };

  return (
    <div className="post">
      {/* Header */}
      <div className="post-top">
        <div className="post-user">
          <img src={post.user.profileImage} alt="profile" />

          <div className="user-details">
            <h3>{post.user.username}</h3>
            <p>{post.user.bio}</p>
          </div>
        </div>

        <div className="post-top-actions">
          {!isOwnPost && (
            <button 
              className={`follow-btn ${isFollowing ? 'following' : hasPendingRequest ? 'pending' : ''}`} 
              onClick={handleFollowAction}
              disabled={hasPendingRequest}
            >
              {getFollowButtonText()}
            </button>
          )}

          <button className="more-btn">
            <MoreHorizontal size={22} />
          </button>
        </div>
      </div>

      {/* Post Image */}
      <div className="post-image">
        <img src={post.imgUrl} alt="post" />
      </div>

      {/* Content */}
      <div className="post-content">
        {/* Actions */}
        <div className="post-actions">
          <div className="left-actions">
            <button onClick={handleLike}>
              <Heart
                size={26}
                fill={post.isLiked ? "red" : "transparent"}
                color={post.isLiked ? "red" : "white"}
              />
            </button>

            <button>
              <MessageCircle size={26} />
            </button>

            <button>
              <Send size={26} />
            </button>
          </div>

          <button>
            <Bookmark size={24} />
          </button>
        </div>
        
        <p><span>{post.coun}</span></p>

        {/* Caption */}
        <p className="caption">
          <span>{post.user.username}</span>
          {post.caption}
        </p>

        {/* Comments */}
        <button className="view-comments">
          View all comments
        </button>

        {/* Add Comment */}
        <div className="add-comment">
          <input
            type="text"
            placeholder="Add a comment..."
          />

          <button>Post</button>
        </div>
      </div>
    </div>
  );
};

export default Post;