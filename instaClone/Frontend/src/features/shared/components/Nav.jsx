import { Link } from "react-router";
import "../styles/nav.scss";
import CreatePost from "../../posts/pages/CreatePost";

const Nav = () => {

  const user = {
    username: "test",
    profileImage:
      "https://ik.imagekit.io/dhruv2006/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.webp",
  };

  return (
    <nav className="nav">
      <div className="nav-left">
        <img
          src={user.profileImage}
          alt="profile"
        />

        <h3>{user.username}</h3>
      </div>

      <div className="nav-right">
        <Link to="/create-post">
            <button>+ New Post</button>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;