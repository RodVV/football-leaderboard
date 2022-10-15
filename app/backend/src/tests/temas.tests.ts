import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import { userMock, tokenMock, usersMockArray } from '../helpers/mocks/login';
import User from '../database/models/User';

chai.use(chaiHttp);

const { expect } = chai;

describe('/teams', () => {
  describe('GET', () => {

    afterEach(() => {
      sinon.restore();
    });

    before(() => {
      sinon.stub(User, 'findOne').returns(userMock as any);
    });

    it('Deve retornar o user role', async () => {
      const response = await chai.request(app).get('/login/validate').send(tokenMock);
      expect(response.body.role).to.equal(userMock.role);
      expect(response.status).to.equal(200);
    });
  });
 });