const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const seedData = require('../data/seedUserData');

const should = chai.should();

chai.use(chaiHttp);

describe('AUTH TESTS', () => {
  beforeEach(async () => {
    await seedData.seed();
  });

  // describe('Logout Tests ->', () => {
  //   it('should logout a user', (done) => {
  //     const agent = chai.request.agent(server);
  //     agent
  //       .post('/auth/login')
  //       .send({
  //         username: 'charmander',
  //         password: 'password',
  //       })
  //       .then(() => {
  //         agent.get('/auth/logout').then((res) => {
  //           res.redirects.length.should.eql(2);
  //           res.status.should.eql(200);
  //           res.type.should.eql('text/html');
  //           done();
  //         });
  //       });
  //   });

  //   it('Should throw error if a user is not logged in', (done) => {
  //     chai
  //       .request(server)
  //       .get('/auth/logout')
  //       .end((err, res) => {
  //         res.redirects.length.should.eql(0);
  //         res.status.should.eql(401);
  //         res.type.should.eql('application/json');
  //         res.body.status.should.eql(
  //           'You need to be logged in to logout.  right?'
  //         );
  //         done();
  //       });
  //   });
  // });

  // describe('Login Tests ->', () => {
  //   it('Should login a User', (done) => {
  //     chai
  //       .request(server)
  //       .post('/auth/login')
  //       .send({
  //         username: 'charmander',
  //         password: 'password',
  //       })
  //       .end((err, res) => {
  //         should.not.exist(err);
  //         res.redirects.length.should.eql(2);
  //         res.status.should.eql(200);
  //         res.type.should.eql('text/html');
  //         done();
  //       });
  //   });

  //   it('Should not login unregistered user', (done) => {
  //     chai
  //       .request(server)
  //       .post('/auth/login')
  //       .redirects(0)
  //       .send({
  //         username: 'not',
  //         password: 'auser',
  //       })
  //       .end((err, res) => {
  //         should.not.exist(err);
  //         res.header.location.should.eql('/auth/login');
  //         res.redirects.length.should.eql(0);
  //         res.status.should.eql(302);
  //         res.type.should.eql('text/plain');
  //         done();
  //       });
  //   });
  // });

  describe('Register Tests ->', () => {
    it('Should register a new user', (done) => {
      chai
        .request(server)
        .post('/auth/register')
        .send({
          username: 'Bob',
          password: 'password',
        })
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(201);
          res.type.should.eql('application/json');
          res.body.user.username.should.eql('Bob');
          res.body.user.password.should.not.eql(null);
          done();
        });
    });
  });
});
