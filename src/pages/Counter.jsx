import { useState } from "react";
// import styles from "./Counter.module.css";

export default function Counter() {
    console.log("something changed");
    
    const [value, setValue] = useState(0);
  return (
    <div >
      <h1>Counter Page</h1>
      <p>This is the counter page of the application.</p>
      <p>Value:<span>{value}</span></p>
      <button 
        // className={styles.primaryBtn} 
       onClick={() => setValue(value + 1)}>Increment</button>
      <button onClick={() => setValue(value - 1)}>Decrement</button>
            <button onClick={() => setValue(0)}>rESET</button>

    </div>
  );
}