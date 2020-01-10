import React from 'react';
import {Header, Card, Image} from 'semantic-ui-react';
import moment from 'moment';

import DeleteButton from './DeleteButton';
import UpdateButton from './UpdateButton';

function EventCard(props){
	const {id, title, body, createdAt, finish} = props.evento;

	return(
	    <Card fluid color="blue" className="cardText">
	      <Card.Content>
	        <Image
	          floated='right'
	          size='mini'
	          src='https://clipart4biz.com/images/transparent-brain-minimalist-4.png'
	        />
	        <Card.Header><h2>{title}</h2></Card.Header>
	        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
	        <Card.Description>{body}</Card.Description>
	      </Card.Content>
	      <Card.Content extra>
	      	<Header as="h4">{finish}</Header>
	      </Card.Content>
	      <Card.Content extra>
	      <div className="ui two buttons">
	         <UpdateButton event={props.evento} />
	         <DeleteButton eventId={id} />
	      </div>
	      </Card.Content>
	    </Card>
	)
}

export default EventCard;