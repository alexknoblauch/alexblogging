import { useEffect } from "react";
import SidebarBlog from "./SidebarBlog";

export default function SidebarLeft({
  setCurBlog,
  blogs,
  setBlogs,
  postModal,
}) {
  useEffect(() => {
    async function getBlogs() {
      try {
        const res = await fetch(
          "http://localhost/alex_blogging_refacture/createBlogs.php",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json", 
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch blogs, status: " + res.status);
        }

        // Get the raw text response to inspect it
        const data = await res.json()

        // Try to parse the raw response as JSON
        try {
          if (Array.isArray(data)) {
            const sortedData = data.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            );
            setBlogs(sortedData);
          } else {
            console.error("Fetched data is not an array:", data);
          }
        } catch (err) {
          console.error("Failed to parse JSON:", err);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }
    getBlogs();
  }, [postModal, setBlogs]);

  return (
    <div className="sidebar-left">
      {blogs.map((blog) => {
        return <SidebarBlog blog={blog} setCurBlog={setCurBlog} />;
      })}
    </div>
  );
}
