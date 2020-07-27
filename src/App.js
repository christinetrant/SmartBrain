import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageInputForm from './components/ImageInputForm/ImageInputForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import 'tachyons';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

const particles = {
  fpsLimit: 60,
  // interactivity: {
  //   detectsOn: "canvas",
  //   events: {
  //     onClick: {
  //       enable: true,
  //       mode: "push"
  //     },
  //     onHover: {
  //       enable: true,
  //       mode: "repulse"
  //     },
  //     resize: true
  //   },
  //   modes: {
  //     bubble: {
  //       distance: 400,
  //       duration: 2,
  //       opacity: 0.8,
  //       size: 40,
  //       speed: 3
  //     },
  //     push: {
  //       quantity: 4
  //     },
  //     repulse: {
  //       distance: 200,
  //       duration: 0.4
  //     }
  //   }
  // },
  particles: {
    color: {
      value: "#ffffff"
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    collisions: {
      enable: true
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 2,
      straight: false
    },
    number: {
      density: {
        enable: true,
        value_area: 800
      },
      value: 80
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: "square"
    },
    size: {
      random: true,
      value: 5
    }
  },
  detectRetina: true
}

 
const app = new Clarifai.App({
 apiKey: '72544c4221bd4b4fa43737e8d84bb367'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      faceBox: {},
      // route directs us to different pages - we want signin to be homepage:
      route: 'signin',
      isSignedIn: false,
      // we need a blank user template to create a new user
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined
      }
    })
  }
  // Just for testing that the frontend and backend talking to each other!
  // componentDidMount() {
  //   fetch('http://localhost:3000')
  //   .then(response => response.json())
  //   // .then(data => console.log(data))
  //   .then(console.log)
  // }

  calculateFaceLocation = (data) => {
    console.log('box', data.outputs[0].data.regions[0].region_info.bounding_box);
    // we save the bounding box results
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    // get the image so we can calculate where to put the box
    const image = document.getElementById('inputImage')
    // get height and width of image:
    const height = Number(image.height);
    const width = Number(image.width);
    console.log(height, width)
    // Need to work out from image where to put the box corners:
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  // then we want to show the box calculated above to do this we wrap the above function in this function below in button submit function:
  displayFaceBox = (box) => {
    this.setState({faceBox: box})
    console.log('box', box)
  }

  onInputChange = (event) => {
    // console.log(event.target.value);
    // set the state to equal the inputted value
    this.setState({input: event.target.value});
  }

  onPictureSubmit = () => {
    // we want to update the image url with the input
    this.setState({imageUrl: this.state.input})
    
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
    // calculate the face detection box
    .then(response => {
      if(response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          // this.setState({
          //   user: {
          //     entries: count
          //   }
          // })
          // code above changes entire object whereas we just want to update count of entries so we use object.assign
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log('Uh oh', err)) 
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <Particles id="tsparticles" params={particles} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>

        { this.state.route === 'home' ?
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageInputForm 
              onPictureSubmit={this.onPictureSubmit} 
              onInputChange={this.onInputChange}
            />
            <FaceRecognition imageUrl={this.state.imageUrl} faceBox={this.state.faceBox}/>
          </div>
        : (this.state.route === 'signin') ?
          <Signin loadUser={this.loadUser } onRouteChange={this.onRouteChange} /> 
          : <Register onRouteChange={this.onRouteChange} />
        }
      </div>
    );
  }
}

export default App;
