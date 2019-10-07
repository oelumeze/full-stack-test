import React from 'react';
import { createUser } from '../../services/albumServices';
import { Redirect } from 'react-router-dom';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            email: "",
            password: ""
        }
        this.setUserName = this.setUserName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    setUserName = (_event) => {
        this.setState({
            username: _event.target.value
        })
    }

    setEmail = (_event) => {
        this.setState({
            email: _event.target.value
        })
    }

    setPassword = (_event) => {
        this.setState({
            password: _event.target.value
        })
    }

    registerUser = (event) => {
        event.preventDefault()
        createUser(this.state.username, this.state.email, this.state.password)
            .then((user) => {
                console.log("user", user)
                if (user.data.success === true) {
                    alert("User has been succesfully created");
                    this.setState({
                        email: "",
                        username: "",
                        password: ""
                    })
                } else {
                    
                }
            }).catch((error) => {
                let errorMessage = error.message || "An unexpected error happened"
                alert(errorMessage)
            })
    }

    render() {
        if(localStorage.getItem("album_access_token")) {
            return <Redirect to="/albums" />
        }

        return (
            <div className="loginForm">
                 <h2>Register</h2>
                 <form onSubmit={this.registerUser}>
                    <div className="form-group">
                        <div className="form-label">
                            <label htmlFor="username"> UserName </label>
                        </div>

                        <div className="form-input">
                            <input type="text" onChange={this.setUserName} placeholder="Enter UserName" value={this.state.username} required/>
                        </div>
                     </div>

                     <div className="form-group">
                        <div className="form-label">
                            <label htmlFor="email"> Email </label>
                        </div>

                        <div className="form-input">
                            <input type="email" onChange={this.setEmail} placeholder="Enter Email" value={this.state.email} required/>
                        </div>
                     </div>

                     <div className="form-group">
                         <div className="form-label">
                            <label htmlFor="password"> Password </label>
                         </div>

                         <div className="form-input">
                            <input type="password" onChange={this.setPassword} placeholder="Enter Password" value={this.state.password} required/>
                         </div>
                     </div>

                     <div className="form-group">
                         <button id="submit" name="submit" className="primary-btn">Register</button>
                     </div>

                 </form>
            </div>
        )
    }
}

export default Register;