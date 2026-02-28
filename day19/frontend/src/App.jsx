import React from "react";
import AppRoutes from "./AppRoutes";
import AuthContext from "./features/auth/AuthContext";
import PostContext from "./features/post/PostContext";


const App = () => {
  
  return(
    <AuthContext>
      <PostContext>
       <AppRoutes />
      </PostContext>
    </AuthContext>
  );
};

export default App;
