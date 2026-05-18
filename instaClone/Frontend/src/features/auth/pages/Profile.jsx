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
import { getAllPosts } from "../../posts/services/post.api";
import { usePost } from "../../posts/hooks/usePost";
import Loader from "../../shared/components/Loader";
import { useNavigate } from "react-router";

const Profile = () => {
  const { user, followRequestsData, handleGetMe, handleLogout, handleGetFollowRequests, handleAcceptFollowRequest, handleRejectFollowRequest } = useAuth();
  const { userPosts, handleGetAllPosts } = usePost();
  const navigate = useNavigate();

  const onLogout = async () => {
    await handleLogout();
    navigate('/login');
  };

  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    if (!user) {
      handleGetMe();
      return;
    }

    fetchProfile();
    handleGetFollowRequests();
    // console.log('Profile loaded, followRequestsData:', followRequestsData); // unnecessary debug log
  }, [user]);

  useEffect(() => {
    if (userPosts) setPosts(userPosts);
  }, [userPosts]);

  useEffect(() => {
    // console.log('followRequestsData updated:', followRequestsData); // unnecessary debug log
  }, [followRequestsData]);

  async function fetchProfile() {
    try {
      const posts = await getAllPosts();
      const followersRes = await getFollowers();
      const followingsRes = await getFollowings();
      setPosts(posts.posts);
      setFollowers(followersRes.followers || []);
      setFollowings(followingsRes.followings || []);
    } catch (err) {
      // console.log(err); // unnecessary debug log
    }
  }

  const handleAccept = async (username) => {
    try {
      await handleAcceptFollowRequest(username);
      await fetchProfile();
    } catch (err) {
      // console.log(err); // unnecessary debug log
    }
  };

  const handleReject = async (username) => {
    try {
      await handleRejectFollowRequest(username);
      await fetchProfile();
    } catch (err) {
      // console.log(err); // unnecessary debug log
    }
  };

  if (!user) {
    return <Loader message="Loading your profile..." />;
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

                <div className="profile-action-buttons">
                  <button className="edit-btn">
                    <Settings size={18} />
                    Edit Profile
                  </button>
                  <button className="logout-btn" onClick={onLogout}>
                    Logout
                  </button>
                </div>
              </div>

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

        {/* FOLLOW REQUESTS */}

        {user && (
          <section className="follow-requests-section">
            <div className="section-title">
              <UserPlus size={20} />
              <h2>Follow Requests</h2>
            </div>

            {!followRequestsData ? (
              <div className="empty-follow-requests">
                <p>Loading follow requests...</p>
              </div>
            ) : followRequestsData.followRequests?.length > 0 ? (
              <div className="follow-requests-list">
                {followRequestsData.followRequests.map((request) => (
                  <div key={request._id} className="follow-request-card">
                    <div className="request-user">
                      <img src={request.follower.profileImage} alt="" />
                      <div>
                        <h4>{request.follower.username}</h4>
                        <p>sent you a follow request</p>
                      </div>
                    </div>
                    <div className="request-actions">
                      <button 
                        className="accept-btn"
                        onClick={() => handleAccept(request.follower.username)}
                      >
                        Accept
                      </button>
                      <button 
                        className="reject-btn"
                        onClick={() => handleReject(request.follower.username)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-follow-requests">
                <p>No incoming follow requests for your profile right now.</p>
              </div>
            )}
          </section>
        )}

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