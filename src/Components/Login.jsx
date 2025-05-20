import { useState } from "react";
import LoginModal from "./LoginModal";

export default function Login({ setSignIn }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loginModal, setLoginModal] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch(`http://localhost/alex_blogging_refacture/login.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include", // <-- this is what keeps the session
    });

    const data = await res.json();
    if (!data.success) return;
    console.log(data);

    setSignIn(true);
  }

  return (
    <>
      {loginModal && <LoginModal setLoginModal={setLoginModal} />}
      <div className="login-page">
        <div>
          <h1>Login:</h1>
          <p className="login-text">
            Please login with your Accont credentials...
          </p>
          <label htmlFor="email"></label>
          <input
            value={email}
            id="email"
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label htmlFor="password"></label>
          <input
            value={password}
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          <button onClick={handleLogin} className="login">
            Login
          </button>
          <br></br>
          <button onClick={setLoginModal} className="sign-in-button">
            Sign up
          </button>
        </div>
      </div>
    </>
  );
}
