import "./App.css";
import React from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank";
import ImageLink from "./components/ImageLink/ImageLink";
import ParticlesComponent from "./components/Particles/Particles"; // Import the ParticlesComponent
import Facerecognition from "./components/Facerecognition/Facerecognition";
// import Clarifai from "clarifai";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";

//You must add your own API key here from Clarifai.
// const app = new Clarifai.App({
//   apiKey: "c216bce63a7d4a04b039b910acdf8a2b",
// });
const intialState={
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedin: false,
  user:{  name: "",
    email: "",
    password: "",
    id:"",
    entries:0,
    joined:""}
}
class App extends React.Component {
  constructor() {
    super();
    this.state = intialState
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };
  displayFaceBox = (box) => {
    this.setState({ box: box });
  };
  OnInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  // OnButtonChange = () => {
  //   this.setState({ imageUrl: this.state.input });

  //   // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
  //   // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
  //   // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
  //   // If that isn't working, then that means you will have to wait until their servers are back up.

  //   app.models
  //     .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
  //     .then((response) => {
  //       console.log("hi", response);
  //       if (response) {
  //         fetch("http://localhost:3000/image", {
  //           method: "put",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({
  //             id: this.state.user.id,
  //           }),
  //         })
  //           .then((response) => response.json())
  //           .then((count) => {
  //             this.setState(Object.assign(this.state.user, { entries: count }));
  //           });
  //       }
  //       this.displayFaceBox(this.calculateFaceLocation(response));
  //     })
  //     .catch((err) => console.log(err));
  // };
  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState(intialState)
    } else if (route === 'home') {
      this.setState({isSignedin: true})
    }
    this.setState({ route: route });
   
  };
  loadUser=(data)=>{
    this.setState({user:{
      name: data.name,
      email: data.email,
      id:data.id,
      entries:data.entries,
      joined:data.joined
    }})
  }
  updatingEntries = (value) => {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        entries: value.entries
      },
    }));
  };
  render() {
    return (
      <div className="App">
        <Navigation isSignedin={this.state.isSignedin} onRouteChange={this.onRouteChange} />
        {this.state.route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : this.state.route === "Register" ? (
          <Register loadUser={this.loadUser}
          onRouteChange={this.onRouteChange} />
        ) : (
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLink id={this.state.user.id}
            updatingEntries={this.updatingEntries}
              OnInputChange={this.OnInputChange}
              OnButtonChange={this.OnButtonChange}
            />
            <Facerecognition
              box={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </div>
        )}
        <ParticlesComponent />
      </div>
    );
  }
}

export default App;
