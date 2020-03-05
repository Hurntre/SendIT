import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server/app';
import seeds from '../../server/db/seeders/seed';

chai.use(chaiHttp);

// should clear and seed db where needed
before(() => {
  seeds.parcelDeleteSeed();
  seeds.parcelCreateSeed();
});

describe('parcel endpoint', () => {
  const loginRoute = '/api/v1/auth/login';
  // eslint-disable-next-line no-unused-vars
  let loginToken;
  it('should login successfully', done => {
    chai
      .request(app)
      .post(loginRoute)
      .send({
        email: 'email56@yahoo.com',
        password: 'pAsSwOrD',
      })
      .end((err, res) => {
        const { success, user, error, token } = res.body;
        loginToken = token;
        expect(res).to.have.status(200);
        expect(success).to.equal(true);
        expect(token).to.not.equal(undefined && null);
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
  it('should fetch all parcels in parcel collection after login', done => {
    chai
      .request(app)
      .get('/api/v1/parcel/allParcel')
      .set('authorization', `Bearer ${loginToken}`)
      .end((err, res) => {
        const { success, parcels, error } = res.body;
        expect(res).to.have.status(200);
        expect(res).to.not.have.status(400);
        expect(res).to.not.have.status(500);
        expect(success).to.equal(true);
        expect(error).to.equal(undefined);
        expect(parcels).to.not.equal(undefined && null);
        // expect(parcels.length).to.equal(2);
        done();
      });
  });
  it('should throw an error when no user is logged in', done => {
    chai
      .request(app)
      .get('/api/v1/parcel/allParcel')
      .end((err, res) => {
        const { errors } = res.body;
        expect(errors).to.not.equal(undefined && null);
        done();
      });
  });
});
