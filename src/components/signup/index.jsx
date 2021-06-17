import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchSignUp} from '../../action'


class SignUp extends Component {
	constructor(props){
		super();
		this.state= {
					name: "",
					email: "",
					password: ""
				};
		this.handleChange=this.handleChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
	}
	
	handleSubmit(e) {
		e.preventDefault();
		this.props.onFetchSignUp(this.state)
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
			<div className="signup-page">
				<div className="signup-page__wrapper">
					<h1 className="signup-page-header">Create an account</h1>  
					<a className="login-link" href="http://localhost:3000/login">or log in</a>  {/*change adress*/}
					<form onSubmit={this.handleSubmit}>
						<label htmlFor="name">Name</label>
						<input className="signup-page-input" type="text" name="name" id="name" onChange={this.handleChange}/>
						<label htmlFor="email">Email</label>
						<input className="signup-page-input" type="email" id="email" name="email" onChange={this.handleChange}/>
						<label htmlFor="password">Password</label>
						<input className="signup-page-input"  type="password" id="password" name="password" onChange={this.handleChange}/>
						<button className="signup-button">Create new account</button>
					</form>
				</div>
			</div>
		);
	}
}

export default connect(
		 state => ({
			 myStore: state
		 }),
		 dispatch => ({
			 onFetchSignUp: (data)=>{
				 dispatch(fetchSignUp({
				 	name: data.name,
					 email: data.email,
					 password: data.password
				 }))
				 
			 }
		 })
		 )(SignUp);
