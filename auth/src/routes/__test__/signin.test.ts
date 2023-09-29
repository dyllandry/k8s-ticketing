import request from "supertest";
import { app } from "../../app";

it('fails when an email that does not exist is supplied', async () => {
	return request(app)
		.post('/api/users/signin')
		.send({ email: 'test@test.com', password: 'password' })
		.expect(400);
});

it('fails when an incorrect password is supplied', async () => {
	const userEmail = "test@test.com";
	const correctPassword = "password";
	const wrongPassword = '1234';

	await request(app)
		.post("/api/users/signup")
		.send({ email: userEmail, password: correctPassword }) .expect(201); return request(app)
		.post('/api/users/signin')
		.send({ email: userEmail, password: wrongPassword })
		.expect(400);
});

it('responds with a cookie when given valid credentails', async () => {
	const userEmail = "test@test.com";
	const correctPassword = "password";

	await request(app)
		.post("/api/users/signup")
		.send({ email: userEmail, password: correctPassword })
		.expect(201);

	const response = await request(app)
		.post('/api/users/signin')
		.send({ email: userEmail, password: correctPassword })
		.expect(200);
	
	expect(response.get('Set-Cookie')).toBeDefined();
});
