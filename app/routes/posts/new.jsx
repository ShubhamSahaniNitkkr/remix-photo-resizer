import { Link, redirect } from "remix";

export const action = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name");
  console.log(name);
  // @to-do -submit to database
  return redirect("/posts");
};

function newPost() {
  return (
    <>
      <div className="flexBox">
        <div>
          <h1>Posts</h1>
        </div>
        <div className="btn">
          <Link to="/posts">back</Link>
        </div>
      </div>
      <div>
        <form method="post">
          <input type="text" name="name" id="name" placeholder="Type name" />
          <button type="submit">Add post</button>
        </form>
      </div>
    </>
  );
}

export default newPost;
