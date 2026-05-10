import AppRoutes from "./AppRoutes";
import "./app.scss";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { PostProvider } from "./features/posts/Post.context.jsx";

const App = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <AppRoutes />
      </PostProvider>
    </AuthProvider>
  );
};

export default App;

