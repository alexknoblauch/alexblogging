import { useEffect } from "react";

export default function BlogContent({ blogs, curBlog, setBlogs }) {

  useEffect(() => {
    async function getBlogs() {
      try {
        const res = await fetch(
          `http://localhost/alex_blogging_refacture/createBlogs.php`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json", 
            },
          }
        );

        if (!res.ok) {
          throw new Error(res.status);
        }

        const data = await res.json();
        data.sort((a,b) => new Date(b.date) - new Date(a.date))
        setBlogs(data);
      } catch (error) {
        console.log(error);
      }
    }
    getBlogs();
  }, []);

  const blog = blogs.find((blog) => blog.id === curBlog);

  return (
    <div className="blog-content">
      {blog ? (
        <>
          <div>
            <h3 className="blog-content-title">{blog.title}</h3>
          </div>
          <div className="blog-content-text">{blog.text}</div>{" "}
        </>
      ) : null}
    </div>
  );
}
