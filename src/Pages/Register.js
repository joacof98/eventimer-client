import React, {useState, useContext} from 'react';
import {Form, Button, Header} from 'semantic-ui-react';
import {AuthContext} from '../context/auth';

import {useMutation} from '@apollo/react-hooks';
import {REGISTER_USER} from '../util/queries.js';

function Register(props){
	const context = useContext(AuthContext);

	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	});
	const [errors, setErrors] = useState({});

	const onChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value});
	}

	const onSubmit = (e) => {
		e.preventDefault();
		registerUser();
	}

	const [registerUser, {loading}] = useMutation(REGISTER_USER, {
		update(_, {data: {register: userData}}){
			context.login(userData);
			props.history.push(`/user/${userData.username}`);
		},
		onError(err){
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values
	});

	return (
		<div className="form-container">
			<Form noValidate onSubmit={onSubmit} className={loading ? 'loading' : ''} >
				<Header as="h1" color="blue">Regístrate</Header>
				<Form.Input
				icon='user' iconPosition='left' 
	    		label="Nombre de usuario"
	    		placeholder="Nombre de usuario"
	    		name="username"
	    		value={values.username}
	    		onChange={onChange}
	    		error={errors.username ? true : false}
    			/>

    			<Form.Input
    			icon='mail' iconPosition='left'
	    		label="Email"
	    		placeholder="Email"
	    		name="email"
	    		value={values.email}
	    		onChange={onChange}
	    		error={errors.email ? true : false}
    			/>

    			<Form.Input
    			icon='lock' iconPosition='left'
    			type="password" 
	    		label="Contraseña"
	    		placeholder="Contraseña"
	    		name="password"
	    		value={values.password}
	    		onChange={onChange}
	    		error={errors.password ? true : false}
    			/>

    			<Form.Input
    			type="password" 
	    		label="Confirmar Contraseña"
	    		placeholder="Confirmar Contraseña"
	    		name="confirmPassword"
	    		value={values.confirmPassword}
	    		onChange={onChange}
	    		error={errors.confirmPassword ? true : false}
    			/>

    			<Button type="submit" color="blue">
    				Registrarse
    			</Button>
    		</Form>

    		{Object.keys(errors).length > 0 && (
    			<div className="ui error message">
    				<ul className="list">
    					{Object.values(errors).map(value => (
    						<li key={value}>{value}</li>
    					))}
    				</ul>
    			</div>
    		)}
		</div>
	);
}

export default Register;