import React from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends React.Component {
    constructor(props) {
        super(props)

        this.doLogout = this.doLogout.bind(this)
        this.cancelLogout = this.cancelLogout.bind(this)

    }

    cancelLogout = () => {
        this.props.history.push('/albums')
    }

    doLogout = () => {
        localStorage.clear();
        this.props.history.push('/login')
    }

    render(){
        if(!localStorage.getItem("album_access_token")) {
            return <Redirect to="/login"/>
        }
        return (
            <div className="logout-column">
                <h4>Logout Page</h4>
                <p>Are You Sure you want to log out ?</p>
                <div className="logout-actions">
                    <button onClick={this.doLogout} className="delete-button">YES</button>
                    <button onClick={this.cancelLogout} className="edit-button">NO</button>
                </div>
            </div>
            
        )
    }
}

export default Logout;