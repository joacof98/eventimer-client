import React, {useState, useContext} from 'react';
import {AuthContext} from '../context/auth';
import {Button, Form, Header} from 'semantic-ui-react';
import {useMutation} from '@apollo/react-hooks';

import {CREATE_EVENT_MUTATION} from '../util/queries';
import {FETCH_EVENTS_QUERY} from '../util/queries';

function EventForm(){
	const {user} = useContext(AuthContext);

	const [values, setValues] = useState({
		title: '',
		body: '',
		finish: ''
	});

	const onChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value});
	}

	const onSubmit = (e) => {
		e.preventDefault();

		var hora = values.finish.split("T");
		var fecha = hora[0].split("-");

  		var value = "Programado para el "+ fecha[2] + "/" + fecha[1] + "/" + fecha[0] + " a las " + hora[1];
  		values.finish = value; 
		createEvent();
	}

	const [createEvent, {error}] = useMutation(CREATE_EVENT_MUTATION, {
		variables: values,
		update(proxy,result){
			const data = proxy.readQuery({  //correr query en cache.
				query: FETCH_EVENTS_QUERY,
				variables: {username: user.username}
			});
			const new_event = result.data.createEvent;

			proxy.writeQuery({				//Escribir data en cache
				query: FETCH_EVENTS_QUERY,
				variables: {username: user.username},
			 	data: {getEvents: [new_event,...data.getEvents]} //Elijo qué devuelve.
			});

			values.title = '';
			values.body = '';
			values.finish = '';
		}
	});

	return (
		<>
		<div className="form-container">
			<Form noValidate onSubmit={onSubmit}>
				<Header as="h3" color="blue">Agregar Evento</Header>
				<Form.Field>
					<Form.Input
						icon='pencil alternate' iconPosition='left'
						placeholder="Título"
						name="title"
						onChange={onChange}
						value={values.title}
						error={error ? true : false}
					/>
					<Form.Input
						icon='pencil alternate' iconPosition='left'
						placeholder="Descripción"
						name="body"
						onChange={onChange}
						value={values.body}
						error={error ? true : false}
					/>
					<Form.Input
						type="datetime-local"
						min="2020-01-01T00:00"
						required 
						name="finish"
						onChange={onChange}
						value={values.finish}
						error={error ? true : false}
					/>


					<Button type="submit" 
							color="blue"
							disabled={(values.title==="" || values.body==="" || values.finish==="") ? true : false} 
					>
						Crear
					</Button>
				</Form.Field>
			</Form>

			{error && (
			<div classname="ui error message" style={{marginBottom: 20}}>
				<ul classname="list">
					<li>{error.graphQLErrors[0].message}</li>
				</ul>
			</div>
			)}
			
		</div>

		</>
	);
}

export default EventForm;

//disabled={values.title==="" || values.body==="" || values.finish==="" ? true : false}
