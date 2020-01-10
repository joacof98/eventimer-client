import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory'; //Todo esto apollo-boost
import {createHttpLink} from 'apollo-link-http';
import {ApolloProvider} from '@apollo/react-hooks';
//for the auth header authorization (token)
import {setContext} from 'apollo-link-context';

const httpLink = createHttpLink({
	uri: 'http://localhost:4000'
});

const authLink = setContext(() => {
	const token = localStorage.getItem('jwtToken');
	return {
		headers: {
			Authorization: token ? `Bearer ${token}` : ''
		}
	}
})

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
	connectToDevTools: true
});

export default(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);