import React from "react";
class Register extends React.Component{
  constructor(props){
    super(props)
    this.state={
      Email:"",
      Password:"",
      Name:""
    }
  }
  OnEmailChange = (event) => {
    this.setState({ Email: event.target.value });
  };
  OnPasswordChange = (event) => {
    this.setState({ Password: event.target.value });
  };
  OnNameChange = (event) => {
    this.setState({ Name: event.target.value });
  };

  OnSubmitChange=()=>{
    fetch("https://smart-brain-api-9.onrender.com/register",{
      method:"post",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        email: this.state.Email,
        password: this.state.Password,
        name:this.state.Name
      }
      )
    }).then(res=>{
     return res.json()
    }).then(data=>{
      if(data.id ){
        this.props.loadUser(data)
        this.props.onRouteChange("home")
      }
     
    })
  }
  render(){
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 center">
      <main className="pa4 black-80">
<div className="measure ">
  <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
    <legend className="f4 fw6 ph0 mh0">Register</legend>
    <div className="mt3">
      <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
      <input onChange={this.OnNameChange}className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
    </div>
    <div className="mt3">
      <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
      <input onChange={this.OnEmailChange}className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
    </div>
    <div className="mv3">
      <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
      <input onChange={this.OnPasswordChange}className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
    </div>
  </fieldset>
  <div className="">
    <input onClick={this.OnSubmitChange} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
  </div>

</div>
</main>
</article>
  )
  }
   
}
export default Register;