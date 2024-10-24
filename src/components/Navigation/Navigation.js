import React from "react";
const Navigation = ({onRouteChange, isSignedin}) => {
  if(isSignedin){
  return (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      <p onClick={()=>onRouteChange("signin")}className="f3 pa3 dim underline pointer black">Sign out</p>
    </nav>
  );}
  else{
    return(
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
    <p onClick={()=>onRouteChange("signin")}className="f3 pa3 dim underline pointer black">Signin</p>
    <p onClick={()=>onRouteChange("Register")}className="f3 pa3 dim underline pointer black">Register</p>
  </nav>)
  }
};
export default Navigation;
