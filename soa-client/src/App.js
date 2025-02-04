import React from "react";
import {User} from "./models/user";
import {createBrowserHistory} from 'history';
import UserService from "./services/user.service";
import Router from "react-router-dom/es/Router";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faKeyboard, faSignOutAlt, faUser, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import Switch from "react-router-dom/es/Switch";
import HomePage from "./pages/home/home.page";
import Route from "react-router-dom/es/Route";
import LoginPage from "./pages/login/login.page";
import RegisterPage from "./pages/register/register.page";
import ProfilePage from "./pages/profile/profile.page";
import DetailPage from "./pages/detail/detail.page";
import CardPaymentPage from "./pages/payment/card-payment.page";
import ForumPage from "./pages/forum/forum.page";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: createBrowserHistory(),
      currentUser: new User()
    };
  }

  componentDidMount() {
    UserService.currentUser.subscribe(data => {
      this.setState({currentUser: data});
    });
  }

  logout() {
    UserService.logOut(this.state.currentUser).then(data => {
        this.state.history.push('/home');
    }, error => {
        this.setState({errorMessage: 'An error occurred'});
    });
  }

  render() {
    const {history, currentUser} = this.state;
    return (
        <Router history={history}>
          <div>
            {this.state.currentUser &&
              <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a className="navbar-brand" href="/home">Shop</a>
                <div className="navbar-nav ml-auto">
                  <Link to="/home" className="nav-item nav-link"><FontAwesomeIcon icon={faHome}/>Home</Link>
                  <Link to="/profile" className="nav-item nav-link"><FontAwesomeIcon icon={faUser}/>{currentUser.name}</Link>
                  <Link to="/forum" className="nav-item nav-link"><FontAwesomeIcon icon={faKeyboard}/>Forum</Link>
                  <a onClick={() => this.logout()} className="nav-item nav-link"><FontAwesomeIcon icon={faSignOutAlt}/>Logout</a>
                </div>
              </nav>
            }
            {!this.state.currentUser &&
              <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a className="navbar-brand" href="/home">Shop</a>
                <div className="navbar-nav ml-auto">
                  <Link to="/home" className="nav-item nav-link"><FontAwesomeIcon icon={faHome}/>Home</Link>
                  <Link to="/register" className="nav-item nav-link"><FontAwesomeIcon icon={faUserPlus}/>Register</Link>
                    <Link to="/login" className="nav-item nav-link"><FontAwesomeIcon icon={faSignOutAlt}/>Login</Link>
                </div>
              </nav>
            }
            <div className="container">
              <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/home" component={HomePage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/register" component={RegisterPage}/>
                <Route path="/profile" component={ProfilePage}/>
                <Route path="/detail:id" component={DetailPage}/>
                <Route path="/payment:id" component={CardPaymentPage}/>
                <Route path="/forum" component={ForumPage}/>
              </Switch>
            </div>
          </div>
        </Router>
    );
  }
}