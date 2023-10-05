import axios from 'axios';
import { buildClient } from '../api/build-client';

const LandingPage = ({ currentUser }) => {
	return currentUser ? (
		<h1>You are signed in</h1>
	) : (
		<h1>You are NOT signed in</h1>
	);
}

LandingPage.getInitialProps = async (context) => {
	// Context includes things like the request, if this component is being rendered on the server.
	const client = buildClient(context);
	const { data } = await client.get(
		'/api/users/currentuser',
	);
	return data;
};

export default LandingPage;

