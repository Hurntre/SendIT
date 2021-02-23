import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server/app';
import seeds from '../../server/db/seeders/seed';

chai.use(chaiHttp);

// should clear and seed db where needed
before(() => seeds.usersDeleteSeed());

describe('User Creation', () => {
  const route = '/api/v1/auth/signup';
  it('should post user ', done => {
    chai
      .request(app)
      .post(route)
      .send({
        firstName: 'Nigeria',
        lastName: 'Lagos',
        email: 'email@yahoo.com',
        phoneNumber: '08088888888',
        password: 'pAsSwOrD',
        confirmPassword: 'pAsSwOrD',
      })
      .end((err, res) => {
        const { success, data, error } = res.body;
        expect(res).to.have.status(200);
        expect(success).to.equal(true);
        expect(data).to.have.all.keys([
          '_id',
          'firstName',
          'lastName',
          'isAdmin',
          'email',
          'phoneNumber',
          '__v',
        ]);
        expect(error).to.equal(undefined);
        done();
      });
  });
  it('should return a token as part of a 200 response  ', done => {
    chai
      .request(app)
      .post(route)
      .send({
        firstName: 'qwery',
        lastName: 'qwertyu',
        email: 'emailqwet@yahoo.com',
        phoneNumber: '08099999999',
        password: 'pAsSwOrD',
        confirmPassword: 'pAsSwOrD',
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
  it('should not post user due to existing user with same email ', done => {
    chai
      .request(app)
      .post(route)
      .send({
        firstName: 'Nigeria',
        lastName: 'Lagos',
        email: 'email@yahoo.com',
        phoneNumber: '0801234567',
        password: 'pAsSwOrD',
        confirmPassword: 'pAsSwOrD',
      })
      .end((err, res) => {
        const { success, error } = res.body;
        expect(res).to.have.status(400);
        expect(success).to.equal(false);
        expect(error).to.equal('That email has been used by another User');
        done();
      });
  });
  it('should not post user due to existing user with same phone number ', done => {
    chai
      .request(app)
      .post(route)
      .send({
        firstName: 'Nigeria',
        lastName: 'Lagos',
        email: 'email33@yahoo.com',
        phoneNumber: '08088888888',
        password: 'pAsSwOrD',
        confirmPassword: 'pAsSwOrD',
      })
      .end((err, res) => {
        const { success, error } = res.body;
        expect(res).to.have.status(400);
        expect(success).to.equal(false);
        expect(error).to.equal(
          'That phone number has been used by another User'
        );
        done();
      });
  });
  it('should be working with trimmed user input', done => {
    chai
      .request(app)
      .post(route)
      .send({
        firstName: '        Nigeria',
        lastName: '      Lagos     ',
        email: '  email234@yahoo.com  ',
        phoneNumber: '     08088888887    ',
        password: '     pAsSwOrD',
        confirmPassword: '    pAsSwOrD',
      })
      .end((err, res) => {
        const { success, data } = res.body;
        expect(res).to.have.status(200);
        expect(success).to.equal(true);
        expect(data).to.have.all.keys([
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
  it('should give error due to missing firstName', done => {
    chai
      .request(app)
      .post(route)
      .send({
        lastName: 'Lagos',
        email: 'email@yahoo.com',
        phoneNumber: '08088888888',
        password: 'pAsSwOrD',
        confirmPassword: 'pAsSwOrD',
      })
      .end((err, res) => {
        const { success, error } = res.body;
        expect(res).to.have.status(400);
        expect(success).to.equal(false);
        expect(error).to.equal('firstName is required');
        done();
      });
  });
  it('should give error due to missing lastName', done => {
    chai
      .request(app)
      .post(route)
      .send({
        firstName: 'Nigeria',
        email: 'email@yahoo.com',
        phoneNumber: '08088888888',
        password: 'pAsSwOrD',
        confirmPassword: 'pAsSwOrD',
      })
      .end((err, res) => {
        const { success, error } = res.body;
        expect(res).to.have.status(400);
        expect(success).to.equal(false);
        expect(error).to.equal('lastName is required');
        done();
      });
  });
  it('should give error due to missing email', done => {
    chai
      .request(app)
      .post(route)
      .send({
        firstName: 'Nigeria',
        lastName: 'Lagos',
        phoneNumber: '08088888888',
        password: 'pAsSwOrD',
        confirmPassword: 'pAsSwOrD',
      })
      .end((err, res) => {
        const { success, error } = res.body;
        expect(res).to.have.status(400);
        expect(success).to.equal(false);
        expect(error).to.equal('email is required');
        done();
      });
  });
  it('should give error due to incomplete email', done => {
    chai
      .request(app)
      .post(route)
      .send({
        firstName: 'Nigeria',
        lastName: 'Lagos',
        email: 'emailyahoo.com',
        phoneNumber: '08088888888',
        password: 'pAsSwOrD',
        confirmPassword: 'pAsSwOrD',
      })
      .end((err, res) => {
        const { success, error } = res.body;
        expect(res).to.have.status(400);
        expect(success).to.equal(false);
        expect(error).to.equal('email must be a valid email');
        done();
      });
  });
  it('should give error due to incomplete email', done => {
    chai
      .request(app)
      .post(route)
      .send({
        firstName: 'Nigeria',
        lastName: 'Lagos',
        email: 'email@yahoo',
        phoneNumber: '08088888888',
        password: 'pAsSwOrD',
        confirmPassword: 'pAsSwOrD',
      })
      .end((err, res) => {
        const { success, error } = res.body;
        expect(res).to.have.status(400);
        expect(success).to.equal(false);
        expect(error).to.equal('email must be a valid email');
        done();
      });
  });
  it('should give error due to missing phoneNumber', done => {
    chai
      .request(app)
      .post(route)
      .send({
        firstName: 'Nigeria',
        lastName: 'Lagos',
        email: 'email@yahoo.com',
        password: 'pAsSwOrD',
        confirmPassword: 'pAsSwOrD',
      })
      .end((err, res) => {
        const { success, error } = res.body;
        expect(res).to.have.status(400);
        expect(success).to.equal(false);
        expect(error).to.equal('phoneNumber is required');
        done();
      });
  });
  it('should give error due to missing password', done => {
    chai
      .request(app)
      .post(route)
      .send({
        firstName: 'Nigeria',
        lastName: 'Lagos',
        email: 'email@yahoo.com',
        phoneNumber: '08088888888',
        confirmPassword: 'pAsSwOrD',
      })
      .end((err, res) => {
        const { success, error } = res.body;
        expect(res).to.have.status(400);
        expect(success).to.equal(false);
        expect(error).to.equal('password is required');
        done();
      });
  });
  it('should give error due to password not equal/above minimum length', done => {
    chai
      .request(app)
      .post(route)
      .send({
        firstName: 'Nigeria',
        lastName: 'Lagos',
        email: 'email@yahoo.com',
        phoneNumber: '08088888888',
        password: 'pAsSwor',
        confirmPassword: 'pAsSwor',
      })
      .end((err, res) => {
        const { success, error } = res.body;
        expect(res).to.have.status(400);
        expect(success).to.equal(false);
        expect(error).to.equal(
          'password with value pAsSwor fails to match the required pattern: /^[a-zA-Z0-9]{8,30}$/'
        );
        done();
      });
  });
  it('should give error due to missing password confirmation', done => {
    chai
      .request(app)
      .post(route)
      .send({
        firstName: 'Nigeria',
        lastName: 'Lagos',
        email: 'email@yahoo.com',
        phoneNumber: '08088888888',
        password: 'pAsSwOrD',
      })
      .end((err, res) => {
        const { success, error } = res.body;
        expect(res).to.have.status(400);
        expect(success).to.equal(false);
        expect(error).to.equal(
          'password missing required peer confirmPassword'
        );
        done();
      });
  });
  it('should give error due to unmatching password and confirmPassword', done => {
    chai
      .request(app)
      .post(route)
      .send({
        firstName: 'Nigeria',
        lastName: 'Lagos',
        email: 'email@yahoo.com',
        phoneNumber: '08088888888',
        password: 'pAsSwOrD',
        confirmPassword: 'PasswroD',
      })
      .end((err, res) => {
        const { success, error } = res.body;
        expect(res).to.have.status(400);
        expect(success).to.equal(false);
        expect(error).to.equal('confirmPassword must be [ref:password]');
        done();
      });
  });
});
