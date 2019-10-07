import React from 'react';
import { userLogin } from '../../services/albumServices';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        }
        this.setPassword = this.setPassword.bind(this);
        this.setUserName = this.setUserName.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    setUserName = (_event) => {
        this.setState({
            email: _event.target.value
        })
    }

    setPassword = (_event) => {
        this.setState({
            password: _event.target.value
        })
    }

    loginUser = (event) => {
       event.preventDefault()
        userLogin(this.state.email, this.state.password)
            .then((user) => {
                console.log("user", user)
                //login successful
                if(user.data.success === true) {
                    //store token in storage
                    let access_token = user.data["user"].token
                    let userId = user.data["user"]._id;
                    let username = user.data["user"].username;
                    let userEmail = user.data["user"].email;

                    localStorage.setItem("album_access_token", access_token)
                    localStorage.setItem("album_userid", userId)
                    localStorage.setItem("album_username", username)
                    localStorage.setItem("album_email", userEmail)

                    this.props.history.push('/albums') 

                } 
            }).catch((error) => {
                // console.log("errror", error)
                alert("Either the username or password is incorrect")
            })
    }

    render() {
        if(localStorage.getItem("album_access_token")) {
            return <Redirect to="/albums" />
        }

        return (
            <div className="loginForm">
                 <h2>Login</h2>
                 <form onSubmit={this.loginUser}>

                     <div className="form-group">
                        <div className="form-label">
                            <label htmlFor="email"> Email </label>
                        </div>

                        <div className="form-input">
                            <input type="email" onChange={this.setUserName} placeholder="Enter Email" required/>
                        </div>

                     </div>

                     <div className="form-group">
                         <div className="form-label">
                            <label htmlFor="password"> Password </label>
                         </div>

                         <div className="form-input">
                            <input type="password" onChange={this.setPassword} placeholder="Enter Password" required/>
                         </div>
                     </div>

                     <div className="form-group">
                         <button id="submit" name="submit" className="primary-btn">Login</button>
                     </div>

                 </form>
            </div>
        )
    }
}

export default Login;