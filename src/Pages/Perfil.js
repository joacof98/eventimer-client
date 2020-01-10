import React, {useContext, useState, useEffect} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {AuthContext} from '../context/auth';
import {FETCH_EVENTS_QUERY} from '../util/queries';
import moment from 'moment'
import {Grid, Transition, Image, Header} from 'semantic-ui-react';

import EventForm from '../Components/EventForm';
import EventCard from '../Components/EventCard';

function Perfil(){
	const [events, setEvents] = useState([]);
	const {user} = useContext(AuthContext);

	const {loading, data} = useQuery(FETCH_EVENTS_QUERY, {
		variables: {username: user.username}
	});

	useEffect(() => {
		if(data){
			setEvents(data.getEvents);
		}
	}, [data]);

	return (
		<Grid columns={4} textAlign="center">
			<Grid.Row columns={2}>
				<Grid.Column>
					<Image src="https://i7.pngguru.com/preview/178/419/741/computer-icons-avatar-login-user-avatar.jpg"
						   circular
						   size="small"
						   centered
						   className="imgHome"
					/>
					<Header as="h1" color="blue">{user.username}</Header>
					<span><Header as="h5" color="grey">{user.email}</Header></span>
					<span><Header as="h5" color="grey">Member since: {moment(user.createdAt).fromNow()}</Header></span>
				</Grid.Column>

				<Grid.Column>
					<EventForm />
				</Grid.Column>
			</Grid.Row>

			<Grid.Row>
				{
					loading ? (
						<Header as="h1" color="blue">Cargando eventos...</Header>
					) : (
						<Transition.Group>
							{events && events.map(event => (
								<Grid.Column key={event.id} style={{marginBottom: 20}}>
									<EventCard evento={event} />
								</Grid.Column>
							))}
						</Transition.Group>
					)
				}
			</Grid.Row>

		</Grid>
	);
}

export default Perfil;