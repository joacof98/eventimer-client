import React, {useState, useContext} from 'react';
import {Form, Button, Header} from 'semantic-ui-react';
import {AuthContext} from '../context/auth';

import {useMutation} from '@apollo/react-hooks';
import {LOGIN_USER} from '../util/queries.js';

function Login(props){
	const context = useContext(AuthContext);
	
	const [errors, setErrors] = useState({});
	const [values, setValues] = useState({
		username: '',
		password: ''
	});

	const onChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value});
	}

	const onSubmit = (e) => {
		e.preventDefault();
		loginUser();
	}

	const [loginUser, {loading}] = useMutation(LOGIN_USER, {
		update(_, {data: {login: userData}}){
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
			<Form noValidate onSubmit={onSubmit} className={loading ? "loading" : ""}>
				<Header as="h1" color="blue">Ingresa a tu cuenta</Header>
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
    			icon='lock' iconPosition='left'
    			type="password" 
	    		label="Contraseña"
	    		placeholder="Contraseña"
	    		name="password"
	    		value={values.password}
	    		onChange={onChange}
	    		error={errors.password ? true : false}
    			/>

    			<Button type="submit" color="blue">
    			Ingresar
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

export default Login;
