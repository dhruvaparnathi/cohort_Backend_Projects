import { Link } from "react-router";
import "../styles/nav.scss";
import CreatePost from "../../posts/pages/CreatePost";
import { getMe } from "../../auth/services/auth.api";
import { useAuth } from "../../auth/hooks/useAuth";
import { useEffect } from "react";

const Nav = () => {
  const { user, handleGetMe, loading } = useAuth();

  useEffect(() => {
    handleGetMe().then((res) => {
      console.log(res);
    });
  }, []);

  if (loading) {
    return (
      <main>
        <h1>Fetching User</h1>
      </main>
    );
  }

  return (
    <nav className="nav">
      <div className="nav-left">
        {user ? (
          <>
            <img src={user.profileImage} alt="profile" />
            <a href="/profile"><h3>{user.username}</h3></a>
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
