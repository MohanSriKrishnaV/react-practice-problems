
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../Data/Users";
import styles from "./Login.module.css";

export default function Login() {

useEffect(() => {    
let data=JSON.parse(localStorage.getItem("user")|| "{}");
    if(data?.isLoggedIn){
      navigate("/home");
    }
 },[]);  


  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();





  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    let userfound = users.find(
      (user) => user.email === email && user.password === password
    );
    if (userfound) {
      alert(`Login Successful! Role: ${userfound.role}`);
      emailRef.current.value = "";
      passwordRef.current.value = "";
      let data={email:email,role:userfound.role,isLoggedIn:true};
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/home");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>User Name:</label>
          <input type="text" name="email" required ref={emailRef} />
        </div>
        <div className={styles.formGroup}>
          <label>Password:</label>
          <input type="password" name="password" required ref={passwordRef} />
        </div>
        <button type="submit" className={StyleSheet.formbutton}>Login</button>
      </form>
    </div>
  );
}
