import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import mockMatchesArray from '../helpers/mocks/matches';
import Matches from '../database/models/Matches';

chai.use(chaiHttp);

const { expect } = chai;

describe('/matches', () => {
  describe('GET', () => {

    afterEach(() => {
      sinon.restore();
    });

    it('Rota get deve retornar todas as matches', async () => {
      sinon.stub(Matches, 'findAll').returns(mockMatchesArray as any);
      const response = await chai.request(app).get('/matches');
      expect(response.body).to.equal(mockMatchesArray.matches);
      expect(response.status).to.equal(200);
    });
  });
 });