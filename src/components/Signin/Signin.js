import React from 'react';

// const Signin = ({onRouteChange}) => {
// 	return (
// 		<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
// 			<main className="pa4 black-80">
// 			  <form className="measure">
// 			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
// 			      <legend className="f2 fw6 ph0 mh0">Sign In</legend>
// 			      <div className="mt3">
// 			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
// 			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
// 			      </div>
// 			      <div className="mv3">
// 			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
// 			        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
// 			      </div>
// 			    </fieldset>
// 			    <div className="">
// 			      <input 
// 			      onClick={() => onRouteChange('home')}
// 			      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
// 			      type="submit" 
// 			      value="Sign in" />
// 			    </div>
// 			    <div className="lh-copy mt3">
// 			      <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
// 			    </div>
// 			  </form>
// 			</main>
// 			</article>
// 	)
// }

class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value})
	}
	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value})
	}
	onSubmitSignIn = (event) => {
		event.preventDefault();
		fetch('https://aqueous-peak-18114.herokuapp.com/signin', {
			method: 'post',
			headers: {'Content-type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
			// .then(response => response.json())
			// .then(data => {
			// 	if(data === 'success') {
			// 		this.props.onRouteChange('home')
			// 	}
			// })
      .then(response => response.json())
      .then(user => {
        if(user.id){
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      })
      .catch(err => console.log('can\'t sign in!'))
		// console.log(this.state)
	}

	render() {
		const { onRouteChange } = this.props;
		return (
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
				<main className="pa4 black-80">
				  <form className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
				        	onChange = { this.onEmailChange }
					        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="email" 
					        name="email-address"  
					        id="email-address" 
				        />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
				        	onChange = { this.onPasswordChange }
				        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="password" 
				        	name="password"  
				        	id="password" 
				        />
				      </div>
				    </fieldset>
				    <div className="">
				      <input 
					      onClick={this.onSubmitSignIn}
					      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
					      type="submit" 
					      value="Sign in" 
					    />
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
				    </div>
				  </form>
				</main>
				</article>
		)
	}
}

export default Signin;