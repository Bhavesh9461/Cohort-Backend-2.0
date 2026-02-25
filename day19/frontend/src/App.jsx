import React from "react";
import AppRoutes from "./AppRoutes";
import AuthContext from "./features/auth/AuthContext";


const App = () => {
  
  return(
    <AuthContext>
       <AppRoutes />
    </AuthContext>
  );
};

export default App;
