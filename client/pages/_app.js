import 'bootstrap/dist/css/bootstrap.css';
import { buildClient } from '../api/build-client';
import { Header } from '../components/header';

const AppComponent = ({ currentUser, Component, pageProps }) => {
	return (
		<div>
			<Header currentUser={currentUser} />
			<Component {...pageProps} />
		</div>
	)
};

// The object passed into custom components is different from the object passed
// into page components.
AppComponent.getInitialProps = async ({ Component, ctx }) => {
	const client = buildClient(ctx);
	const { data } = await client.get('/api/users/currentuser');

	// getInitialProps for pages isn't automatically called if we define the method in _app.
	// So here we manually call their functions. And below pass them the results as pageProps.
	let pageProps;
	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}

	return {
		pageProps,
		...data
	};
};

export default AppComponent;
