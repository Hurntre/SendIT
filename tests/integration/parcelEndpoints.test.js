import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server/app';
import seeds from '../../server/db/seeders/seed';

chai.use(chaiHttp);

let loginToken;

before(async () => {
  await seeds.parcelDeleteSeed();
  await seeds.parcelCreateSeed();
});

before('login user', done => {
  chai
    .request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'email56@yahoo.com',
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

describe('parcel endpoint', () => {
  it('should fetch all parcels in parcel collection after login', done => {
    chai
      .request(app)
      .get('/api/v1/parcel/parcels')
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
      .get('/api/v1/parcel/parcels')
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
