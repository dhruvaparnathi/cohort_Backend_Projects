import React, { useState } from "react";
import "../styles/post.scss";

import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

const Post = ({ post }) => {

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(99);

  const handleLike = () => {
    setLiked(!liked);

    if (!liked) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
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

        <button className="more-btn">
          <MoreHorizontal size={22} />
        </button>
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
                fill={liked ? "red" : "transparent"}
                color={liked ? "red" : "white"}
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

        {/* Likes */}
        <h4 className="likes">{likes} likes</h4>

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