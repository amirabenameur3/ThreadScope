import { Route, Routes } from "react-router-dom";

import FeedLayout from "./components/layout/FeedLayout";
import Post from "./pages/Post";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FeedLayout />}>
        <Route path="post/:postId" element={<Post />} />
      </Route>
    </Routes>
  );
}

export default App;