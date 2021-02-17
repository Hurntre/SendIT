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
before('login user', done => {
  chai
    .request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'admin@yahoo.com',
      password: 'pAsSwOrD',
    })
    .end((err, res) => {
      const { success, token } = res.body;
      loginToken = token;
      expect(res).to.have.status(200);
      expect(success).to.equal(true);
      done();
    });
});

describe('parcel endpoints', () => {
  const route = '/api/v1/parcels';

  describe('Parcel GET requests', () => {
    it('should fetch all parcels in parcel collection after login', done => {
      chai
        .request(app)
        .get(route)
        .set('authorization', `Bearer ${loginToken}`)
        .end((err, res) => {
          const { success, parcels } = res.body;
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
          done();
        });
    });
    it('should throw an error when no user is logged in', done => {
      chai
        .request(app)
        .get(route)
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
  });
  describe('Parcel POST requests ', () => {
    it('should create a parcel', done => {
      chai
        .request(app)
        .post(route)
        .set('authorization', `Bearer ${loginToken}`)
        .send({
          description: 'A White Nike Airforce 1',
          weight: 1.15,
          pickUpDate: Date.now() + 86500000,
          pickUpAddress: 'No 5, National Stadium Crescent, Abuja town, Florida',
          receiverName: 'Paul Smith',
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
    it('should return an error due to invalid receiverAddress', done => {
      chai
        .request(app)
        .post(route)
        .set('authorization', `Bearer ${loginToken}`)
        .send({
          description: 'A White Nike Airforce 1',
          weight: 1.15,
          pickUpDate: Date.now() + 86500000,
          pickUpAddress: 'No 5, National Stadium Crescent, Abuja town, Florida',
          receiverName: 'Paul Smith',
          receiverPhoneNumber: '08111111111',
          receiverAddress: 'your',
        })
        .end((err, res) => {
          const { success, error } = res.body;
          expect(res).to.have.status(404);
          expect(success).to.equal(false);
          expect(error).to.equal('Invalid address');
          done();
        });
    });

    it('should return an error when authorization is not in header', done => {
      chai
        .request(app)
        .post(route)
        .send({
          description: 'An apple laptop',
          weight: '3.0',
          pickUpDate: Date.now(),
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
        .post(route)
        .set('authorization', `Bearer ${loginToken}`)
        .send({
          weight: '3.0',
          pickUpDate: Date.now() + 864000010,
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
        .post(route)
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
        .post(route)
        .set('authorization', `Bearer ${loginToken}`)
        .send({
          description: 'A White Nike Airforce 1',
          weight: 1.15,
          pickUpDate: Date.now(),
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
        .post(route)
        .set('authorization', `Bearer ${loginToken}`)
        .send({
          description: 'An apple laptop',
          pickUpDate: Date.now() + 864000010,
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
        .post(route)
        .set('authorization', `Bearer ${loginToken}`)
        .send({
          description: 'A White Nike Airforce 1',
          weight: 1.15,
          pickUpDate: Date.now() + 86500000,
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
});
