import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server/app';
import seeds from '../../server/db/seeders/seed';

chai.use(chaiHttp);

// should clear and seed db where needed
before(() => {
  seeds.usersDeleteSeed();
  seeds.userCreateSeed();
});

describe('Password Reset', () => {
  const route = '/api/v1/auth/reset';
  let resetPasswordRoute;
  it('should send email notification for password reset', done => {
    chai
      .request(app)
      .post(route)
      .send({ email: 'email56@yahoo.com' })
      .end((err, res) => {
        const { success, data } = res.body;
        const { message, token } = res.body.data;
        resetPasswordRoute = `/api/v1/auth/reset/${token}`;
        expect(res).to.have.status(200);
        expect(success).to.equal(true);
        expect(message).to.equal(
          'A reset email has been sent to email56@yahoo.com.'
        );
        expect(data).contains({
          message,
        });
        done();
      });
  });
  it('should throw an error when email does not exist in db', done => {
    chai
      .request(app)
      .post(route)
      .send({ email: 'testing@yahoo.com' })
      .end((err, res) => {
        const { success, error } = res.body;
        expect(res).to.have.status(400);
        expect(success).to.equal(false);
        expect(error).to.equal('Email not found');
        done();
      });
  });
  it('should throw an error when an invalid email is provided', done => {
    chai
      .request(app)
      .post(route)
      .send({ email: 'testingyahoo.com' })
      .end((err, res) => {
        const { success, error } = res.body;
        expect(res).to.have.status(400);
        expect(success).to.equal(false);
        expect(error).to.equal('Email entered is invalid');
        done();
      });
  });
  it('should throw an error when no email is provided', done => {
    chai
      .request(app)
      .post(route)
      .send({})
      .end((err, res) => {
        const { success, error } = res.body;
        expect(res).to.have.status(400);
        expect(success).to.equal(false);
        expect(error).to.equal('email is required');
        done();
      });
  });
  it('should successfully update password when fields match', done => {
    chai
      .request(app)
      .post(resetPasswordRoute)
      .send({
        password: 'ffFinest1',
        confirmPassword: 'ffFinest1',
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
  it('should throw error when token has expired or has been used once', done => {
    chai
      .request(app)
      .post(resetPasswordRoute)
      .send({
        password: 'ffFinest1',
        confirmPassword: 'ffFinest1',
      })
      .end((err, res) => {
        const { success, error } = res.body;
        expect(res).to.have.status(400);
        expect(success).to.equal(false);
        expect(error).to.equal(
          'Password reset token is invalid or has expired'
        );
        done();
      });
  });

  it('should throw error if reset page is requested using invalid token', done => {
    chai
      .request(app)
      .get(resetPasswordRoute)
      .end((err, res) => {
        const { success, error } = res.body;
        expect(res).to.have.status(400);
        expect(success).to.equal(false);
        expect(error).to.equal(
          'Password reset token is invalid or has expired'
        );
        done();
      });
  });
  it('should throw an error when both fields do not match', done => {
    chai
      .request(app)
      .post(resetPasswordRoute)
      .send({
        password: 'ffFinest1',
        confirmPassword: 'ggGinest1',
      })
      .end((err, res) => {
        const { success, error } = res.body;
        expect(res).to.have.status(400);
        expect(success).to.equal(false);
        expect(error).to.equal('Both field do not match');
        done();
      });
  });
  it('should throw an error when password is not provided', done => {
    chai
      .request(app)
      .post(resetPasswordRoute)
      .send({
        confirmPassword: 'ffFinest1',
      })
      .end((err, res) => {
        const { success, error } = res.body;
        expect(res).to.have.status(400);
        expect(success).to.equal(false);
        expect(error).to.equal('password is required');
        done();
      });
  });
  it('should throw an error when confirmPassword is not provided', done => {
    chai
      .request(app)
      .post(resetPasswordRoute)
      .send({
        password: 'ffFinest1',
      })
      .end((err, res) => {
        const { success, error } = res.body;
        expect(res).to.have.status(400);
        expect(success).to.equal(false);
        expect(error).to.equal('confirmPassword is required');
        done();
      });
  });
  it('should throw an error when password is not up to length of 8', done => {
    chai
      .request(app)
      .post(resetPasswordRoute)
      .send({
        password: 'ffF',
        confirmPassword: 'ggGinest1',
      })
      .end((err, res) => {
        const { success, error } = res.body;
        expect(res).to.have.status(400);
        expect(success).to.equal(false);
        expect(error).to.equal(
          'password length must be at least 8 characters long'
        );
        done();
      });
  });
  it('should throw an error when confirmPassword is not up to length of 8', done => {
    chai
      .request(app)
      .post(resetPasswordRoute)
      .send({
        password: 'ffFinest1',
        confirmPassword: 'ffF',
      })
      .end((err, res) => {
        const { success, error } = res.body;
        expect(res).to.have.status(400);
        expect(success).to.equal(false);
        expect(error).to.equal(
          'confirmPassword length must be at least 8 characters long'
        );
        done();
      });
  });
});
