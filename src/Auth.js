import React, { Component } from 'react';
var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyALlReaa_sg15NTAvslDtseudELgYBJhfY",
    authDomain: "survey-fb666.firebaseapp.com",
    databaseURL: "https://survey-fb666.firebaseio.com",
    projectId: "survey-fb666",
    storageBucket: "survey-fb666.appspot.com",
    messagingSenderId: "975358678745"
  };
  firebase.initializeApp(config);


class Auth extends Component {
  constructor(props){
    super(props);
    this.state ={ err:''}

    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.signup = this.signup.bind(this)
  }

  login(event){
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const auth = firebase.auth()

    const promise = auth.signInWithEmailAndPassword(email, password) 

    promise.then(user => {
      var lout = document.getElementById("logout");
      lout.classList.remove('hide');
    })

    promise.catch(e => {
      var err = e.message;
      this.setState({err:err});
    });
  }
  
  logout(){
  
  }

  signup(){

    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const auth = firebase.auth()

    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise
    .then(user => { 
      var err = "Welcome" + user.email;
      firebase.database().ref('/users'+user.uid).set({
        email: user.email
      });
      this.setState({err: err});
    });

    promise
      .catch(e => {
        var err = e.message;
        this.setState({err: err});
      })

  }


  render(){
    return(
      <div>
        <h6>{this.state.err}</h6>
        <input id="email" ref="email" type='email' placeholder='Enter your email' /><br />
        <input id="pass" ref="password" type='password' placeholder='Enter your Password' /><br />
      
        <button onClick={this.login}>Login</button>
        <button onClick={this.signup}>Sign up</button>
        <button id='logout'className="hide"  onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Auth;
