import React, {Component} from 'react';
import {userActions} from "../../_actions/user.actions";
import {FormGroup, HelpBlock} from "react-bootstrap";
import {connect} from "react-redux";

class LoginView extends Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    };

    render() {

        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;

        return (
            <div className="loginColumns animated fadeInDown">
                <div className="row">

                    <div className="col-md-6">
                        <h2 className="font-bold">Welcome to Go#</h2>

                        <p>
                            Perfectly designed and precisely prepared admin theme with over 50 pages with extra new web
                            app views.
                        </p>

                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry's standard dummy text ever since the 1500s.
                        </p>

                        <p>
                            When an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>

                        <p>
                            <small>It has survived not only five centuries, but also the leap into electronic
                                typesetting, remaining essentially unchanged.
                            </small>
                        </p>

                    </div>
                    <div className="col-md-6">
                        <div className="ibox-content">
                            <form className="m-t" role="form" action="index.html">
                                <FormGroup validationState={(submitted && !username ? 'error' : null)}>
                                    <input type="text" name="username" className="form-control" placeholder="Username" required="" value={username} onChange={this.handleChange}/>
                                    <HelpBlock>{(submitted && !username ? 'Username is required' : '')}</HelpBlock>
                                </FormGroup>
                                <FormGroup validationState={(submitted && !password ? 'error' : null)}>
                                    <input type="password" name="password" className="form-control" placeholder="Password" required="" value={password} onChange={this.handleChange}/>
                                    <HelpBlock>{(submitted && !password ? 'Password is required' : '')}</HelpBlock>
                                </FormGroup>
                                <button onClick={this.handleSubmit} disabled={loggingIn} className="btn btn-primary block full-width m-b">Login</button>

                                <a href="#">
                                    <small>Forgot password?</small>
                                </a>

                                <p className="text-muted text-center">
                                    <small>Do not have an account?</small>
                                </p>
                                <a className="btn btn-sm btn-white btn-block" href="register.html">Create an account</a>
                            </form>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-md-6">
                        Go# Tsimura Production
                    </div>
                    <div className="col-md-6 text-right">
                        <small>© 2018</small>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginView = connect(mapStateToProps)(LoginView);
export { connectedLoginView as LoginView };