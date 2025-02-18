import userService from "../../services/user.service";
import {User} from "../../models/user";
import React from "react";
import './register.page.css';
import UserService from "../../services/user.service";

export default class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        if (userService.currentUserValue) {
            this.props.history.push('/');
        }

        this.state = {
            user: new User('', '', ''),
            submitted: false,
            loading: false,
            errorMessage: ''
        };
    }

    handleChange(e) {
        var { name, value } = e.target;
        var user = this.state.user;
        user[name] = value;
        this.setState({ user: user });
    }

    handleRegister(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { user } = this.state;
        if (!(user.username && user.password && user.name)) {
            return;
        }

        this.setState({ loading: true });
        UserService.register(user).then(data => {
            this.props.history.push('/login');
        }, error => {
            if (error.response.status == 409) {
                this.setState({ errorMessage: 'Username is not available', loading: false });
            } else {
                this.setState({ errorMessage: 'An error occurred', loading: false });
            }
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

                {/* Registration Form */}
                <form name="form" onSubmit={(e) => this.handleRegister(e)}>
                    {/* Full Name Field */}
                    <div className={'form-group' + (submitted && !user.name ? ' has-error' : '')}>
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            className="input-field"
                            name="name"
                            value={user.name}
                            onChange={(e) => this.handleChange(e)}
                        />
                        {submitted && !user.name && <div className="help-block error-message">Name is required</div>}
                    </div>

                    {/* Username Field */}
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="input-field"
                            name="username"
                            value={user.username}
                            onChange={(e) => this.handleChange(e)}
                        />
                        {submitted && !user.username &&
                            <div className="help-block error-message">Username is required</div>}
                    </div>

                    {/* Password Field */}
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            name="password"
                            value={user.password}
                            onChange={(e) => this.handleChange(e)}
                        />
                        {submitted && !user.password &&
                            <div className="help-block error-message">Password is required</div>}
                    </div>

                    {/* Submit Button */}
                    <button className="submit-button" disabled={loading}>Sign Up</button>
                </form>
            </div>

        );
    }
}