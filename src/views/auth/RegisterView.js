import React, {Component} from 'react';
import {userActions} from "../../_actions/user.actions";
import {FormGroup, HelpBlock} from "react-bootstrap";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class RegisterView extends Component {
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
        const { email, password, firstName, lastName, passwordConf } = this.state;
        const { dispatch } = this.props;
        if (email && password && firstName && lastName && passwordConf && password === passwordConf) {
            let user = {
                email,
                username: email,
                firstName,
                lastName,
                password,
                confirmPassword: passwordConf,
            };

            dispatch(userActions.register(user));
        }
    };

    render() {

        const { loggingIn } = this.props;
        const { email, password, submitted, firstName, lastName, passwordConf } = this.state;

        return (
            <div className="middle-box text-center loginscreen   animated fadeInDown">
                <div>
                    <div>
                        <h1 className="logo-name">Go#</h1>
                    </div>
                    <h3>Register to Go#</h3>
                    <form className="m-t" role="form" action="login.html">
                        <FormGroup validationState={(submitted && !email ? 'error' : null)}>
                            <input type="email" name="email" className="form-control" placeholder="Email" required="" value={email} onChange={this.handleChange}/>
                            <HelpBlock>{(submitted && !email ? 'Email is required' : '')}</HelpBlock>
                        </FormGroup>
                        <FormGroup validationState={(submitted && !firstName ? 'error' : null)}>
                            <input type="text" name="firstName" className="form-control" placeholder="First Name" required="" value={firstName} onChange={this.handleChange}/>
                            <HelpBlock>{(submitted && !firstName ? 'First Name is required' : '')}</HelpBlock>
                        </FormGroup>
                        <FormGroup validationState={(submitted && !lastName ? 'error' : null)}>
                            <input type="text" name="lastName" className="form-control" placeholder="Last Name" required="" value={lastName} onChange={this.handleChange}/>
                            <HelpBlock>{(submitted && !lastName ? 'Last Name is required' : '')}</HelpBlock>
                        </FormGroup>
                        <FormGroup validationState={(submitted && (!password || (passwordConf !== password)) ? 'error' : null)}>
                            <input type="password" name="password" className="form-control" placeholder="Password" required="" value={password} onChange={this.handleChange}/>
                            <HelpBlock>{(submitted && !password ? 'Password is required' : '')}</HelpBlock>
                        </FormGroup>
                        <FormGroup validationState={(submitted && (!passwordConf || (passwordConf !== password)) ? 'error' : null)}>
                            <input type="password" name="passwordConf" className="form-control" placeholder="Confirm Password" required="" value={passwordConf} onChange={this.handleChange}/>
                            <HelpBlock>{(submitted && !passwordConf
                                ? 'Password is required'
                                : submitted && (passwordConf !== password)
                                ? 'Passwords do not match'
                                : '')}
                                </HelpBlock>
                        </FormGroup>
                        <button onClick={this.handleSubmit} disabled={loggingIn} className="btn btn-primary block full-width m-b">Register</button>
                        <p className="text-muted text-center"><small>Already have an account?</small></p>
                        <Link to={'/login'} className="btn btn-sm btn-white btn-block">Login</Link>
                    </form>
                    <br/>
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

const connectedLoginView = connect(mapStateToProps)(RegisterView);
export { connectedLoginView as RegisterView };