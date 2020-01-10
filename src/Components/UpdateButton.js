import React, {useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {Button, Modal, Form, Header} from 'semantic-ui-react';

import {UPDATE_EVENT_MUTATION} from '../util/queries';

function UpdateButton(props){
	const {id, title, body, finish} = props.event;

	const [openModal, setOpenModal] = useState(false);
	const [values, setValues] = useState({
		title: title,
		body: body,
		finish: finish
	});

	const onChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value});
	}

	const onSubmit = (e) => {
		e.preventDefault();
		updateEvent();
	}

	const [updateEvent] = useMutation(UPDATE_EVENT_MUTATION, {
		variables: {
			eventId: id,
			title: values.title,
			body: values.body,
			finish: values.finish
		},
		update(){
			setOpenModal(false);
		}
	});

	return(
		<>
		<Button basic color='green' onClick={() => setOpenModal(true)}>
	    		Actualizar
	    </Button>

	    <Modal open={openModal}>
	    	<Modal.Header>
	    		<Header color="blue">Actualizar Evento</Header>
	    	</Modal.Header>
	    	<Modal.Content>
	    		<Modal.Description>
	    		<Form noValidate onSubmit={onSubmit}>
					<Form.Field>
						<Form.Input
							icon='pencil alternate' iconPosition='left'
							placeholder="Título"
							name="title"
							onChange={onChange}
							value={values.title}
						/>
						<Form.Input
							icon='pencil alternate' iconPosition='left'
							placeholder="Descripción"
							name="body"
							onChange={onChange}
							value={values.body}
						/>
						<Form.Input
							type="text"
							required 
							name="finish"
							onChange={onChange}
							value={values.finish}
						/>


						<Button type="submit" 
								color="blue"
								disabled={(values.title==="" || values.body==="" || values.finish==="") ? true : false} 
						>
							Actualizar
						</Button>
					</Form.Field>
				</Form>

	    		</Modal.Description>
	    	</Modal.Content>

	    	<Modal.Actions>
	    		<Button color="red" onClick={() => setOpenModal(false)}> Cancelar </Button>
	    	</Modal.Actions>

	    </Modal>
	    </>
	)
}

export default UpdateButton;