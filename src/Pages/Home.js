import React from 'react';
import { Image, Container, Header, Button } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

function Home(){
	return (
		<Container>
			<div className="imgHome">
				<Header as='h1' textAlign='center' color="blue">EvenTimer</Header>
				<Image src='https://clipart4biz.com/images/transparent-brain-minimalist-4.png' 
					   size='medium' 
					   centered
				/>
			</div>
			<Header as="h3" textAlign="center">Organiza y lleva la cuenta exacta de todos tus eventos día a día.</Header>
			
			<Header textAlign="center">
				<Button size='massive'
						centered 
						color="blue"
						as={Link}
						to="/registrate"
				>
					¡Empieza Ahora!
				</Button>
			</Header>
		</Container>
	);
}

export default Home;