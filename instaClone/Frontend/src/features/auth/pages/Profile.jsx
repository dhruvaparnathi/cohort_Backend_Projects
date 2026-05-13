import React, { useEffect, useState } from "react";
import "../styles/profile.scss";

import Nav from "../../shared/components/Nav";

import {
  Grid3X3,
  Users,
  UserPlus,
  Settings,
  Heart,
} from "lucide-react";

import { useAuth } from "../hooks/useAuth";
import { getFollowers, getFollowings } from "../services/auth.api";
import { getAllPosts, getFeed } from "../../posts/services/post.api";
import { usePost } from "../../posts/hooks/usePost";

const Profile = () => {
  const { user, handleGetMe } = useAuth();
  const { userPosts, handleGetAllPosts } = usePost();

  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    if (!user) {
      handleGetMe();
      return;
    }

    fetchProfile();
  }, [user]);

  useEffect(() => {
    if (userPosts) setPosts(userPosts);
  }, [userPosts]);

  async function fetchProfile() {
    try {
      const posts = await getAllPosts();
      const followersRes = await getFollowers();
      const followingsRes = await getFollowings();
      setPosts(posts.posts);
      setFollowers(followersRes.followers || []);
      setFollowings(followingsRes.followings || []);
    } catch (err) {
      console.log(err);
    }
  }

  if (!user) {
    return (
      <div className="profile-loading">
        <h1>Loading Profile...</h1>
      </div>
    );
  }

  return (
    <>
      <Nav />

      <main className="modern-profile">

        {/* HERO SECTION */}

        <section className="profile-hero">

          <div className="hero-overlay"></div>

          <div className="profile-card">

            <div className="profile-left">

              <div className="profile-image-wrapper">
                <img src={user.profileImage} alt="profile" />
              </div>

            </div>

            <div className="profile-right">

              <div className="profile-top-row">

                <div>
                  <h1>{user.username}</h1>
                  <p>@{user.username}</p>
                </div>

                <button className="edit-btn">
                  <Settings size={18} />
                  Edit Profile
                </button>

              </div>

              <p className="bio">
                {user.bio || "No bio added yet."}
              </p>

              {/* STATS */}

              <div className="stats-grid">

                <div className="stat-card">
                  <Grid3X3 size={22} />
                  <h2>{posts.length}</h2>
                  <p>Posts</p>
                </div>

                <div className="stat-card">
                  <Users size={22} />
                  <h2>{followers.length}</h2>
                  <p>Followers</p>
                </div>

                <div className="stat-card">
                  <UserPlus size={22} />
                  <h2>{followings.length}</h2>
                  <p>Following</p>
                </div>

              </div>

              {/* FOLLOWERS PREVIEW */}

              <div className="followers-preview">

                <div className="preview-images">

                  {followers.slice(0, 6).map((follower, index) => (
                    <img
                      key={index}
                      src={follower?.follower?.profileImage}
                      alt=""
                    />
                  ))}

                </div>

                <span>
                  Connected with {followers.length} amazing people
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* POSTS */}

        <section className="posts-section">

          <div className="section-title">
            <Heart size={20} />
            <h2>Your Posts</h2>
          </div>

          <div className="posts-grid">

            {posts.length === 0 ? (
              <div className="empty-posts">
                <h2>No Posts Yet</h2>
                <p>Share your first memory 🚀</p>
              </div>
            ) : (
              posts.map((post) => (
                <div className="modern-post-card" key={post._id}>

                  <img src={post.imgUrl} alt="post" />

                  <div className="post-content">

                    <div className="post-user-info">
                      <img
                        src={user.profileImage}
                        alt=""
                      />

                      <div>
                        <h4>{user.username}</h4>
                        <p>{post.likesCount || 0} likes</p>
                      </div>
                    </div>

                    <p>{post.caption}</p>

                  </div>

                </div>
              ))
            )}

          </div>

        </section>

      </main>
    </>
  );
};

export default Profile;