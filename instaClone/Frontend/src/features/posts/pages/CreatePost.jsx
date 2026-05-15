import { useState, useEffect, useRef } from "react";
import "../styles/createPost.scss";
import { usePost } from "../hooks/usePost";
import { useNavigate } from "react-router";
import Loader from "../../shared/components/Loader";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const postImageInputFieldRef = useRef(null);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const { loading, handleCreatePost, handleGetFeed } = usePost();

  if(loading){
    return <Loader message="Creating your post..." />
  }

  const handleImageChange = (e) => {
    const postFile = e.target.files[0];

    if (postFile){
      setImage(URL.createObjectURL(postFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = postImageInputFieldRef.current.files[0];

    await handleCreatePost(file, caption);

    setCaption("");
    setImage(null);
    
    await handleGetFeed();
    navigate('/');
  };

  return (
    <div className="create-post-page">
      <div className="create-post-card">
        <h1>Create New Post</h1>

        <form onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div className="upload-box">
            {image ? (
              <img src={image} alt="preview" />
            ) : (
              <label htmlFor="fileUpload">
                <span>Upload Photo</span>
              </label>
            )}

            <input
            ref={postImageInputFieldRef}
            required
              type="file"
              id="fileUpload"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {/* Caption */}
          <textarea
            placeholder="Write a caption..."
            required
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          {/* Button */}
          <button type="submit">
            Share Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;