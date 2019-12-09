// import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server/index';

chai.use(chaiHttp);

describe('User Creation', () => {
  const route = '/api/v1/auth/signup';
  const User = {
    firstName: 'Nigeria',
    lastName: 'Lagos',
    email: 'email@yahoo.com',
    phoneNumber: '08088888888',
    password: 'pAsSwOrD',
    repeat_password: 'pAsSwOrD',
  };
  const UserUnTrimmed = {
    firstName: 'Nigeria',
    lastName: 'Lagos',
    email: '  email@yahoo.com  ',
    phoneNumber: '08088888888',
    password: 'pAsSwOrD',
    repeat_password: 'pAsSwOrD',
  };
  it('should post user ', done => {
    chai
      .request(app)
      .post(route)
      .send(User)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('error due to missing data', done => {
    chai
      .request(app)
      .post(route)
      .send({
        firstName: 'Nigeria',
        email: 'email@yahoo.com',
        phoneNumber: '08088888888',
        password: 'pAsSwOrD',
        repeat_password: 'pAsSwOrD',
      })
      .end((err, res) => {
        // console.log(res);
        expect(res).to.have.status(404);
        done();
      });
  });
  it('should be working with trimmed user input', done => {
    chai
      .request(app)
      .post(route)
      .send(UserUnTrimmed)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
