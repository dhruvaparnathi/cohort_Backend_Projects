import { useContext } from "react";
import "../styles/profile.scss";
import { AuthContext } from "../auth.context";

const Profile = () => {
    const context = useContext(AuthContext);
    const { loading, user, followingsData, followersData, handleGetFollowings, handleGetFollowers } = context;
  const user = {
    username: "test_user",
    bio: "Full Stack Developer 🚀 | React & Node.js",

    profileImage:
      "https://ik.imagekit.io/dhruv2006/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.webp",

    followings: [
      {
        username: "alex",
        profileImage:
          "https://i.pravatar.cc/150?img=11",
      },

      {
        username: "emma",
        profileImage:
          "https://i.pravatar.cc/150?img=12",
      },

      {
        username: "john",
        profileImage:
          "https://i.pravatar.cc/150?img=13",
      },
    ],

    followers: [
      {
        username: "dhruv",
        profileImage:
          "https://i.pravatar.cc/150?img=14",
      },

      {
        username: "rohit",
        profileImage:
          "https://i.pravatar.cc/150?img=15",
      },

      {
        username: "virat",
        profileImage:
          "https://i.pravatar.cc/150?img=16",
      },
    ],
  };

  return (
    <div className="profile-page">
      <div className="profile-card">

        {/* Top */}
        <div className="profile-top">

          <div className="profile-image">
            <img
              src={user.profileImage}
              alt="profile"
            />
          </div>

          <div className="profile-info">
            <h1>{user.username}</h1>

            <p>{user.bio}</p>

            <div className="profile-stats">
              <div>
                <h3>{user.followers.length}</h3>
                <span>Followers</span>
              </div>

              <div>
                <h3>{user.followings.length}</h3>
                <span>Following</span>
              </div>

              <div>
                <h3>12</h3>
                <span>Posts</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="profile-bottom">

          {/* Following */}
          <div className="follow-section">
            <h2>Following</h2>

            <div className="follow-list">
              {user.followings.map((following, index) => (
                <div
                  className="follow-user"
                  key={index}
                >
                  <img
                    src={following.profileImage}
                    alt="following"
                  />

                  <p>{following.username}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Followers */}
          <div className="follow-section">
            <h2>Followers</h2>

            <div className="follow-list">
              {user.followers.map((follower, index) => (
                <div
                  className="follow-user"
                  key={index}
                >
                  <img
                    src={follower.profileImage}
                    alt="follower"
                  />

                  <p>{follower.username}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;