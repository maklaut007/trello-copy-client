import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchLogIn} from '../../action'


class LogIn extends Component {
	constructor(props){
		super();
		this.state= {
					email: "",
					password: ""
				};
		this.handleChange=this.handleChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
	}
	
	handleSubmit(e) {
		e.preventDefault();
		this.props.onFetchLogIn(this.state)
	}
	handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        this.setState({
          [name]: value
        });

    }
	render() {
		return (
			<div className="login-page">
				<div className="login-page__wrapper">
					<h1 className="login-page-header">Log in</h1> 
					<a className="signup-link" href="http://localhost:3000/signup">or create an account</a>  {/*change adress*/}
					<form onSubmit={this.handleSubmit}>
						<label htmlFor="email">Email</label>
						<input className="login-page-input" type="email" id="email" name="email" onChange={this.handleChange}/>
						<label htmlFor="password">Password</label>
						<input className="login-page-input" type="password" id="password" name="password" onChange={this.handleChange}/>
						<button className="login-button">Log In</button>
					</form>
				</div>
				<div className= "recomended account">You can use this account to test: user1@mail.com / user1</div>
			</div>
		);
	}
}

export default connect(
		 state => ({
			 myStore: state
		 }),
		 dispatch => ({
			 onFetchLogIn: (data)=>{
				 dispatch(fetchLogIn({
					 email: data.email,
					 password: data.password
				 }))
				 
			 }
		 })
		 )(LogIn);
