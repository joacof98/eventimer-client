import gql from 'graphql-tag';

export const LOGIN_USER = gql`
	mutation login(
		$username: String!
		$password: String!
	) {
		login(
			username: $username
			password: $password
		){
			id email username createdAt token
		}
	}
`

export const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			registerInput: {
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id email username createdAt token
		}
	}

`

export const FETCH_EVENTS_QUERY = gql`
	query($username: String!){
		getEvents(username: $username){
			id
			title
			body
			createdAt
			finish
			username
		}
	}

`

export const CREATE_EVENT_MUTATION = gql`
	mutation createEvent(
		$title: String!
		$body: String!
		$finish: String!
	) {
		createEvent(
			body: $body
			title: $title 
			finish: $finish
		) {
			id username createdAt title body finish
		}
	}
`

export const DELETE_EVENT_MUTATION = gql`
	mutation deleteEvent($eventId: ID!){
		deleteEvent(eventId: $eventId)
	}

`
export const UPDATE_EVENT_MUTATION = gql`
	mutation updateEvent(
		$eventId: ID! 
		$title: String! 
		$body: String! 
		$finish: String!
	){
		updateEvent(
			eventId: $eventId
			title: $title
			body: $body
			finish: $finish
		) {
			id username createdAt title body finish
		}
	}

`
