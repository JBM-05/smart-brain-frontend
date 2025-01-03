import React from "react";
class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Password: "",
    };
  }
  OnEmailChange = (event) => {
    this.setState({ Email: event.target.value });
  };
  OnPasswordChange = (event) => {
    this.setState({ Password: event.target.value });
  };
  OnSubmitChange=()=>{
    fetch("https://smart-brain-api-9.onrender.com/signin",{
      method:"post",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        email: this.state.Email,
        password: this.state.Password
      }
      )
    }).then(res=>{
     return res.json()
    }).then(data=>{
      if(data.id){
        this.props.loadUser(data)
        this.props.onRouteChange("home")
        
      }
      else{
        console.log("failed")
      }
    })
  }
  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 center">
        <main className="pa4 black-80">
          <div className="measure ">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.OnEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.OnPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.OnSubmitChange}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange("Register")}
                href="#0"
                className="f6 link dim black db pointer"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}
export default Signin;
