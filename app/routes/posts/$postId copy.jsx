import { useParams } from "remix";

function PostChild() {
  const params = useParams();
  return <div>Post {params.postId}</div>;
}

export default PostChild;
