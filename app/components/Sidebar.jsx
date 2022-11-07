import React from "react";
import { Link } from "remix";

function Sidebar() {
  return (
    <div class="sidebar">
      <Link className="active" to="/">
        Home
      </Link>
      <Link to="/posts">Posts</Link>
    </div>
  );
}

export default Sidebar;
