import { Link } from "react-router";
import "../styles/nav.scss";
import { useAuth } from "../../auth/hooks/useAuth";
import Loader from "./Loader";

const Nav = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader message="Loading user data..." />;
  }

  return (
    <nav className="nav">
      <div className="nav-left">
        {user ? (
          <>
            <img src={user.profileImage} alt="profile" />
            <Link to="/profile"><h3>{user.username}</h3></Link>
          </>
        ) : (
          <h3>Loading...</h3>
        )}
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
