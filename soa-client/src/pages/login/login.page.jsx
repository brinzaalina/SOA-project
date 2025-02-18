import './login.page.css';
import UserService from "../../services/user.service";
import {User} from "../../models/user";
import React from "react";

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        if (UserService.currentUserValue) {
            this.props.history.push('/');
        }

        this.state = {
            user: new User('', ''),
            submitted: false,
            loading: false,
            errorMessage: ''
        };
    }

    handleChange(e) {
        var {name, value} = e.target;
        var user = this.state.user;
        user[name] = value;
        this.setState({user: user});
    }

    handleLogin(e) {
        e.preventDefault();
        this.setState({submitted: true});
        const {user} = this.state;
        if (!(user.username && user.password)) {
            return;
        }

        this.setState({loading: true});
        UserService.login(user).then(data => {
            this.props.history.push('/home');
        }, error => {
            this.setState({errorMessage: 'Username or password is incorrect', loading: false});
        });
    }

    render() {
        const { user, submitted, loading, errorMessage } = this.state;
        return (
            <div className="card-container">
                {/* Profile Image */}
                <img className="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"/>

                {/* Bootstrap Error Alert */}
                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        <strong>Error! </strong> {errorMessage}
                    </div>
                )}

                {/* Login Form */}
                <form name="form" onSubmit={(e) => this.handleLogin(e)}>
                    {/* Username Field */}
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="input-field"
                            name="username"
                            value={user.username}
                            onChange={(e) => this.handleChange(e)}
                        />
                        {submitted && !user.username &&
                            <div className="help-block error-message">Username is required</div>
                        }
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            name="password"
                            value={user.password}
                            onChange={(e) => this.handleChange(e)}
                        />
                        {submitted && !user.password &&
                            <div className="help-block error-message">Password is required</div>
                        }
                    </div>

                    {/* Submit Button */}
                    <button className="submit-button" disabled={loading}>Login</button>
                </form>
            </div>

        );
    }
}