import React, { useEffect, useRef, useState } from "react";
import Product from "./Product";

export default function Products1() {
  const [list, setList] = useState([]);
  const originalList = useRef([]); // store master data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  // Fetch Data 📌
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        originalList.current = data;
        setList(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Apply Search + Sorting 📌
  const filterAndSort = () => {
    let updatedList = [...originalList.current];

    // search
    if (search.trim()) {
      updatedList = updatedList.filter((item) =>
        item.title.toLowerCase().includes(search.trim().toLowerCase())
      );
    }

    // sort
    switch (sort) {
      case "rating_inc":
        updatedList.sort((a, b) => a.rating.rate - b.rating.rate);
        break;
      case "rating_dec":
        updatedList.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case "cost_inc":
        updatedList.sort((a, b) => a.price - b.price);
        break;
      case "cost_dec":
        updatedList.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setList(updatedList);
  };

  // Debounce Search Input 📌
  useEffect(() => {
    const timer = setTimeout(() => {
      filterAndSort();
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Re-sort when dropdown changes 📌
  const handleSort = (e) => {
    setSort(e.target.value);
    filterAndSort();
  };

  return (
    <div>
      <h1>Products Page</h1>
{/* 
      <select value={sort} onChange={handleSort}>
        <option value="">Select Sorting Option</option>
        <option value="rating_inc">Rating → Low to High</option>
        <option value="rating_dec">Rating → High to Low</option>
        <option value="cost_inc">Price → Low to High</option>
        <option value="cost_dec">Price → High to Low</option>
      </select> */}
{/* 
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      /> */}

      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong!</p>}

      <ul>
        {list.map((item) => (
          <li key={item.id}>
        <Product data={item}/>

          </li>
        ))}

      </ul>

      {!loading && list.length === 0 && <p>No products found</p>}
    </div>
  );
}
