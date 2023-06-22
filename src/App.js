import { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentpage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const indexofLastItem = currentPage * postsPerPage;
  const indexofFirstItem = indexofLastItem - postsPerPage;
  const page = posts.slice(indexofFirstItem, indexofLastItem);

  const paginate = (number) => {
    setCurrentpage(number);
  };

  const renderedPosts = page.map((item) => {
    return (
      <ul key={item.id} className="list-group m-1">
        <li className="list-group-item ">{item.title}</li>
      </ul>
    );
  });

  let allPages = [];
  for (let i = 1; i <= posts.length / postsPerPage; i++) {
    allPages.push(i);
  }

  const renderPages = allPages.map((el) => {
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item m-1">
            <a onClick={() => paginate(el)} className="page-link" href="!#">
              {el}
            </a>
          </li>
        </ul>
      </nav>
    );
  });

  return (
    <div className="container">
      <h1>Posts</h1>
      {loading ? "Loading..." : renderedPosts}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {renderPages}
      </div>
    </div>
  );
}

export default App;
