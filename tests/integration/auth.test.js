import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server/app';
import seeds from '../../server/db/seeders/seed';

chai.use(chaiHttp);

// should clear and seed db where needed
before(async () => {
  await seeds.usersDeleteSeed();
  await seeds.userCreateSeed();
});

describe('User Authentication', () => {
  const loginRoute = '/api/v1/auth';
  it('should login successfully', done => {
    chai
      .request(app)
      .post(loginRoute)
      .send({
        email: 'email56@yahoo.com',
        password: 'pAsSwOrD',
      })
      .end((err, res) => {
        const { success, user, error } = res.body;
        expect(res).to.have.status(200);
        expect(success).to.equal(true);
        expect(user).to.have.all.keys([
          '_id',
          'firstName',
          'lastName',
          'email',
          'isAdmin',
          'phoneNumber',
          '__v',
        ]);
        expect(error).to.equal(undefined);
        done();
      });
  });
  it('should give error due to unregistered email', done => {
    chai
      .request(app)
      .post(loginRoute)
      .send({
        email: 'email@yahoo.com',
        password: 'pAsSwOrD',
      })
      .end((err, res) => {
        const { success, error } = res.body;
        expect(res).to.have.status(400);
        expect(success).to.equal(false);
        expect(error).to.equal(
          'The email address is not associated with any account'
        );
        done();
      });
  });
  it('should give error due to invalid password', done => {
    chai
      .request(app)
      .post(loginRoute)
      .send({
        email: 'email56@yahoo.com',
        password: 'pAsSwOrDD',
      })
      .end((err, res) => {
        const { success, error } = res.body;
        expect(res).to.have.status(400);
        expect(success).to.equal(false);
        expect(error).to.equal('Invalid password');
        done();
      });
  });
  it('should return a token as part of a 200 response ', done => {
    chai
      .request(app)
      .post(loginRoute)
      .send({
        email: 'email56@yahoo.com',
        password: 'pAsSwOrD',
      })
      .end((err, res) => {
        const { success, error, token } = res.body;
        expect(res).to.have.status(200);
        expect(success).to.equal(true);
        expect(token).to.not.equal(undefined && null);
        expect(error).to.equal(undefined);
        done();
      });
  });
  it('should be working with trimmed user input', done => {
    chai
      .request(app)
      .post(loginRoute)
      .send({
        email: '  email56@yahoo.com',
        password: '     pAsSwOrD   ',
      })
      .end((err, res) => {
        const { success, user } = res.body;
        expect(res).to.have.status(200);
        expect(success).to.equal(true);
        expect(user).to.have.all.keys([
          '_id',
          'firstName',
          'lastName',
          'isAdmin',
          'email',
          'phoneNumber',
          '__v',
        ]);
        done();
      });
  });
  it('should give error due to missing email', done => {
    chai
      .request(app)
      .post(loginRoute)
      .send({
        password: 'pAsSwOrD',
      })
      .end((err, res) => {
        const { success, error } = res.body;
        expect(res).to.have.status(400);
        expect(success).to.equal(false);
        expect(error).to.equal('email is required');
        done();
      });
  });
  it('should give error due to missing password', done => {
    chai
      .request(app)
      .post(loginRoute)
      .send({
        email: 'email56@yahoo.com',
      })
      .end((err, res) => {
        const { success, error } = res.body;
        expect(res).to.have.status(400);
        expect(success).to.equal(false);
        expect(error).to.equal('password is required');
        done();
      });
  });
});
