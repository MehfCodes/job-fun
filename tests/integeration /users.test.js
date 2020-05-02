// // eslint-disable-next-line node/no-unpublished-require
// const request = require('supertest');
// const { ObjectId } = require('mongoose');
// const Users = require('./../../models/userModel');

// let server;

// describe('/api/v1/users', () => {
//   beforeEach(() => {
//     // eslint-disable-next-line global-require
//     server = require('./../../server');
//   });
//   afterEach(async () => {
//     server.close();
//     await Users.remove({});
//   });

//   describe('GET /', () => {
//     it('return all users', async () => {
//       await Users.collection.insertMany([
//         {
//           username: 'erfan',
//           email: 'erfan@gmail.com',
//           password: '123456789',
//           passwordConfirm: '123456789',
//           role: 'user'
//         },
//         {
//           username: 'mohammad',
//           email: 'mohammad@gmail.com',
//           password: '123456789',
//           passwordConfirm: '123456789',
//           role: 'user'
//         }
//       ]);
//       const res = await request(server).get('/api/v1/users/');
//       expect(res.status).toBe(200);
//     });
//   });
//   describe('GET /:id', () => {
//     it('return user with id', async () => {
//       const user = await Users.create({
//         username: 'erfan',
//         email: 'erfan@gmail.com',
//         password: '123456789',
//         passwordConfirm: '123456789',
//         role: 'user'
//       });
//       const res = await request(server).get(`/api/v1/users/${user._id}`);
//       expect(res.body).toHaveProperty('name', user.name);
//     });
//     it('return 404 status code if there is not user', async () => {
//       const id = new ObjectId('1');
//       const res = await request(server).get(`/api/v1/users/${id}`);
//       expect(res.status).toBe(404);
//     });
//   });
// });
