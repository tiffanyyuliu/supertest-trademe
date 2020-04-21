const request = require('supertest');
const { expect } = require('chai');

const app = 'https://api.trademe.co.nz';

describe('Trademe UsedCars Categories', () => {
  it('return how many named brands of used cars are available in the TradeMe UsedCars category', (done) => {
    request(app)
      .get('/v1/Categories/UsedCars.json')
      .expect(200)
      .end((err, res) => {
        console.log(`${res.body.Subcategories.length} car brands are available`);
        done();
      });
  });

  it('check that the brand ‘Kia’ exists and return the current number of Kia cars listed.', (done) => {
    request(app)
      .get('/v1/Categories/UsedCars.json?with_counts=true')
      .expect(200)
      .end((err, res) => {
        res.body.Subcategories.forEach((make) => {
          if (make.Name === 'Kia') { console.log(`current number of ${make.Name} cars listed: ${make.Count}`); }
        });
        done();
      });
  });

  it('check that the brand ‘Hispano Suiza’ does not exist.', (done) => {
    request(app)
      .get('/v1/Categories/UsedCars.json')
      .expect(200)
      .end((err, res) => {
        res.body.Subcategories.forEach((make) => {
          expect(make.Name).to.not.equal('Hispano Suiza');
        });
        done();
      });
  });
});
