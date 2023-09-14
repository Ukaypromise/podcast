import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PostsList from "./features/posts/PostsList";

function App() {

  return (
    <>
      <div>
        <h1>React In Rails</h1>
        <p> This is a React app inside a Rails app. </p>
        <p>
          {" "}
          The React app is in <code>podcast-frontend</code> directory.{" "}
        </p>
        <p>
          {" "}
          The Rails app is in <code>podcast-backend</code> directory.{" "}
        </p>
        <p> The React app is served by Vite. </p>
      </div>
      <PostsList />
    </>
  );
}

export default App;
