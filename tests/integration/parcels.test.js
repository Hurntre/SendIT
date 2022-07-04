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
let parcelID;
let userID;

before('login user', done => {
  chai
    .request(app)
    .post('/api/v1/auth')
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

describe('parcel endpoints', () => {
  const baseRoute = '/api/v1/parcels';

  describe('Get parcels', () => {
    it('should fetch all parcels in parcel collection', done => {
      chai
        .request(app)
        .get(baseRoute)
        .set('authorization', `Bearer ${loginToken}`)
        .end((err, res) => {
          const { success, parcels } = res.body;
          // assigning the first parcel array id to a variable for use in a later test
          parcelID = parcels[0]._id;

          const {
            description,
            weight,
            status,
            pickUpAddress,
            receiverName,
            receiverPhoneNumber,
            receiverAddress,
          } = parcels[0];
          expect(res).to.have.status(200);
          expect(success).to.equal(true);
          expect(parcels).to.be.a('array');
          expect(parcels.length).to.equal(2);
          expect(parcels[0])
            .to.be.an('object')
            .include.keys(
              'description',
              'weight',
              'pickUpDate',
              'expectedDeliveryDate'
            );
          expect(description).to.equal('A White Nike Airforce 1');
          expect(weight).to.equal(1.15);
          expect(status).to.equal('requested');
          expect(pickUpAddress).to.equal(
            'No 5, National Stadium Crescent, Abuja town, Florida'
          );
          expect(receiverName).to.equal('Paul Smith');
          expect(receiverPhoneNumber).to.equal(8111111111);
          expect(receiverAddress).to.equal(
            'your house number, street, area, town, city, state.'
          );

          done();
        });
    });
    it('should throw an error when no user is logged in', done => {
      chai
        .request(app)
        .get(baseRoute)
        .end((err, res) => {
          const {
            errors: { body },
          } = res.body;
          expect(res).to.have.status(401);
          expect(body).to.eql(['You are not authorized']);
          expect(body).to.be.a('array');
          done();
        });
    });

    it('should fetch single parcel from collection by id', done => {
      chai
        .request(app)
        .get(`${baseRoute}/${parcelID}`)
        .set('authorization', `Bearer ${loginToken}`)
        .end((err, res) => {
          const { success, parcel } = res.body;
          expect(res).to.have.status(200);
          expect(success).to.equal(true);
          expect(parcel).to.be.a('object');
          done();
        });
    });

    it('should fail to fetch single parcel due to invalid parcel ID', done => {
      chai
        .request(app)
        .get(`${baseRoute}/767a5666aea84a04be6ee7e9`)
        .set('authorization', `Bearer ${loginToken}`)
        .end((err, res) => {
          const { success, error } = res.body;
          expect(res).to.have.status(404);
          expect(success).to.equal(false);
          expect(error).to.eql('No parcel with such ID exists in DB');
          done();
        });
    });
  });
  describe('Create Parcels ', () => {
    it('should create a parcel', done => {
      chai
        .request(app)
        .post(baseRoute)
        .set('authorization', `Bearer ${loginToken}`)
        .send({
          description: 'A White Nike Airforce 1',
          weight: 1.15,
          pickUpDate: new Date(Date.now() + 86500000),
          pickUpAddress: 'No 5, National Stadium Crescent, Abuja town, Florida',
          receiverName: 'Paul Smith',
          receiverPhoneNumber: '08111111111',
          receiverAddress: 'university of Ibadan, Ibadan, Oyo state',
        })
        .end((err, res) => {
          const { success, message } = res.body;
          expect(res).to.have.status(200);
          expect(success).to.equal(true);
          expect(message).to.equal('new parcel created successfully');

          done();
        });
    });
    it('should return an error due to invalid receiverAddress', done => {
      chai
        .request(app)
        .post(baseRoute)
        .set('authorization', `Bearer ${loginToken}`)
        .send({
          description: 'A White Nike Airforce 1',
          weight: 1.15,
          pickUpDate: new Date(Date.now() + 86500000),
          pickUpAddress: 'No 5, National Stadium Crescent, Abuja town, Florida',
          receiverName: 'Paul Smith',
          receiverPhoneNumber: '08111111111',
          receiverAddress: 'your',
        })
        .end((err, res) => {
          const { success, error } = res.body;
          expect(res).to.have.status(400);
          expect(success).to.equal(false);
          expect(error).to.equal(
            'receiverAddress length must be at least 5 characters long'
          );
          done();
        });
    });

    it('should return an error when authorization is not in header', done => {
      chai
        .request(app)
        .post(baseRoute)
        .send({
          description: 'An apple laptop',
          weight: '3.0',
          pickUpDate: new Date(Date.now() + 86500000),
          receiverName: 'John Doe',
          receiverPhoneNumber: '08012345678',
          receiverAddress: 'House NO, street, town, city, state',
        })
        .end((err, res) => {
          const {
            errors: { body },
          } = res.body;
          expect(res).to.have.status(401);
          expect(body).to.be.a('array');
          expect(body[0]).to.equal('You are not authorized');
          done();
        });
    });

    it('should return an error due to missing parcel description', done => {
      chai
        .request(app)
        .post(baseRoute)
        .set('authorization', `Bearer ${loginToken}`)
        .send({
          weight: '3.0',
          pickUpDate: new Date(Date.now() + 86500000),
          receiverName: 'John Doe',
          receiverPhoneNumber: '08012345678',
          receiverAddress: 'House NO, street, town, city, state',
        })
        .end((err, res) => {
          const { success, error } = res.body;
          expect(res).to.have.status(400);
          expect(success).to.equal(false);
          expect(error).to.equal('description is required');
          done();
        });
    });
    it('should return an error due to missing parcel pickUpDate', done => {
      chai
        .request(app)
        .post(baseRoute)
        .set('authorization', `Bearer ${loginToken}`)
        .send({
          description: 'An apple laptop',
          weight: '3.0',
          receiverName: 'John Doe',
          receiverPhoneNumber: '08012345678',
          receiverAddress: 'House NO, street, town, city, state',
        })
        .end((err, res) => {
          const { success, error } = res.body;
          expect(res).to.have.status(400);
          expect(success).to.equal(false);
          expect(error).to.equal('pickUpDate is required');
          done();
        });
    });
    it('should return an error due to invalid parcel pickUpDate', done => {
      chai
        .request(app)
        .post(baseRoute)
        .set('authorization', `Bearer ${loginToken}`)
        .send({
          description: 'A White Nike Airforce 1',
          weight: 1.15,
          pickUpDate: new Date(Date.now()),
          pickUpAddress: 'No 5, National Stadium Crescent, Abuja town, Florida',
          receiverName: 'Paul Smith',
          receiverPhoneNumber: '08111111111',
          receiverAddress:
            'your house number, street, area, town, city, state.',
        })
        .end((err, res) => {
          const { success, error } = res.body;
          expect(res).to.have.status(400);
          expect(success).to.equal(false);
          expect(error).to.equal(
            'pickup date has to be at least a day from now'
          );
          done();
        });
    });
    it('should return an error due to missing parcel weight', done => {
      chai
        .request(app)
        .post(baseRoute)
        .set('authorization', `Bearer ${loginToken}`)
        .send({
          description: 'An apple laptop',
          pickUpDate: new Date(Date.now() + 86500000),
          receiverName: 'John Doe',
          receiverPhoneNumber: '08012345678',
          receiverAddress: 'House NO, street, town, city, state',
        })
        .end((err, res) => {
          const { success, error } = res.body;
          expect(res).to.have.status(400);
          expect(success).to.equal(false);
          expect(error).to.equal('weight is required');
          done();
        });
    });
    it('should return an error due to missing parcel receiverName', done => {
      chai
        .request(app)
        .post(baseRoute)
        .set('authorization', `Bearer ${loginToken}`)
        .send({
          description: 'A White Nike Airforce 1',
          weight: 1.15,
          pickUpDate: new Date(Date.now() + 86500000),
          pickUpAddress: 'No 5, National Stadium Crescent, Abuja town, Florida',
          receiverPhoneNumber: '08111111111',
          receiverAddress:
            'your house number, street, area, town, city, state.',
        })
        .end((err, res) => {
          const { success, error } = res.body;
          expect(res).to.have.status(400);
          expect(success).to.equal(false);
          expect(error).to.equal('receiverName is required');
          done();
        });
    });
  });
  describe('User parcel endpoints', () => {
    it('should create parcel by user', done => {
      chai
        .request(app)
        .post(baseRoute)
        .set('authorization', `Bearer ${loginToken}`)
        .send({
          description: 'A White Nike Airforce 1',
          weight: 1.15,
          pickUpDate: Date.now() + 86500000,
          pickUpAddress: 'No 5, National Stadium Crescent, Abuja town, Florida',
          receiverName: 'Aderonbi',
          receiverPhoneNumber: '08111111111',
          receiverAddress:
            'your house number, street, area, town, city, state.',
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
        .get(`${baseRoute}/user/${userID}`)
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
});
