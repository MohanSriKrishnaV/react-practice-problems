import React, { useState, useEffect, useRef } from "react";

export default function InfiniteScroll() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

    const [nomore, setnoMore] = useState(false);


  const endRef = useRef(null);

  // Fetch posts when page changes
  useEffect(() => {
    const fetchData = async () => {
            if(nomore) return;



      setLoading(true);

      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
      );
      const data = await res.json();

      if(data.length<10){
        setnoMore(true);
      }

      setPosts(prev => [...prev, ...data]);
      setLoading(false);
    };


    fetchData();
  }, [page]);

  // Setup infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !loading &&
          window.scrollY > 0 // 👈 ensures user scrolled!
        ) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (endRef.current) observer.observe(endRef.current);

    return () => observer.disconnect();
  }, [loading]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Infinite Scroll — Posts</h2>

      {posts.map((post,index) => (
        <div
          key={index}
          style={{ marginBottom: 20, border: "1px solid #ccc", padding: 10 }}
        >
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}

      {loading && <p>Loading...</p>}

            {nomore && <p>no more data...</p>}



      <div ref={endRef} style={{ height: 5 }}></div>
    </div>
  );
}
