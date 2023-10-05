import axios from 'axios';

const buildClient = ({ req }) => {
	const onServer = typeof window === 'undefined';

	if (onServer) {
		return axios.create({
			baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
			headers: req.headers
		});
	}

	return axios.create({ baseURL: '/' });
};

export { buildClient };
