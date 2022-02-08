/* eslint-disable no-underscore-dangle */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server/app';
import seeds from '../../server/db/seeders/seed';

chai.use(chaiHttp);

before(async () => {
  await seeds.parcelDeleteSeed();
  await seeds.parcelCreateSeed();
});

let loginToken;
let userID;

before('login user', done => {
  chai
    .request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'admin@yahoo.com',
      password: 'pAsSwOrD',
    })
    .end((err, res) => {
      const { success, token, user } = res.body;
      loginToken = token;
      userID = user._id;
      expect(res).to.have.status(200);
      expect(success).to.equal(true);
      done();
    });
});

describe('user endpoint', () => {
  it('should create parcel by user', done => {
    chai
      .request(app)
      .post('/api/v1/parcels')
      .set('authorization', `Bearer ${loginToken}`)
      .send({
        description: 'A White Nike Airforce 1',
        weight: 1.15,
        pickUpDate: Date.now() + 86500000,
        pickUpAddress: 'No 5, National Stadium Crescent, Abuja town, Florida',
        receiverName: 'Aderonbi',
        receiverPhoneNumber: '08111111111',
        receiverAddress: 'your house number, street, area, town, city, state.',
      })
      .end((err, res) => {
        const { success, message } = res.body;
        expect(res).to.have.status(200);
        expect(success).to.equal(true);
        expect(message).to.equal('new parcel created successfully');

        done();
      });
  });
  it('should fetch all parcels created by user', done => {
    chai
      .request(app)
      .get(`/api/v1/users/${userID}/parcels`)
      .set('authorization', `Bearer ${loginToken}`)
      .end((err, res) => {
        const { success, parcels } = res.body;
        expect(res).to.have.status(200);
        expect(success).to.equal(true);
        expect(parcels).to.be.a('array');
        done();
      });
  });
});
