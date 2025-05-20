import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Login from "./Components/Login";
import MainMenu from "./Components/MainMenu";

function App() {
  const [signIn, setSignIn] = useState(false);
  const [postModal, setPostModal] = useState(false);

  return (
    <div className="App">
      {!signIn && <Login setSignIn={setSignIn} />}
      {signIn && (
        <>
          <Header setSignIn={setSignIn} setPostModal={setPostModal} />
          <MainMenu postModal={postModal} setPostModal={setPostModal} />
        </>
      )}
    </div>
  );
}

export default App;
