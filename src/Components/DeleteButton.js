import React, {useState, useContext} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {Button, Confirm} from 'semantic-ui-react';
import {AuthContext} from '../context/auth';

import {FETCH_EVENTS_QUERY} from '../util/queries';
import {DELETE_EVENT_MUTATION} from '../util/queries';

function DeleteButton(props){
	const id = props.eventId;
	const {user} = useContext(AuthContext);
	const [confirmOpen, setConfirmOpen] = useState(false);

	const [deleteEvent] = useMutation(DELETE_EVENT_MUTATION, {
		variables: {eventId: id},
		update(proxy){
			setConfirmOpen(false);
			const data = proxy.readQuery({ 
				query: FETCH_EVENTS_QUERY,
				variables: {username: user.username}
			});
			const eventsUpdated = data.getEvents.filter(p => p.id !== id);
			proxy.writeQuery({
				query: FETCH_EVENTS_QUERY,
				variables: {username: user.username},
				data: {getEvents: eventsUpdated}
			}); //What returns
		}
	});

	return(
		<>
		<Button basic color='red' onClick={() => setConfirmOpen(true)}>
	    	Borrar
	    </Button>

	    <Confirm open={confirmOpen}
	    		 onCancel={() => setConfirmOpen(false)}
	    		 onConfirm={deleteEvent}
	    		 content="Estás seguro de borrar este evento?"
	    />
	    </>
	)
}

export default DeleteButton;