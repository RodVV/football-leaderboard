import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import { teamMock, teamsArrayMock } from '../helpers/mocks/teams';
import Team from '../database/models/Team';

chai.use(chaiHttp);

const { expect } = chai;

describe('/teams', () => {
  describe('GET', () => {

    afterEach(() => {
      sinon.restore();
    });

    it('Rota get deve retornar todos os times', async () => {
      sinon.stub(Team, 'findAll').returns(teamsArrayMock as any);
      const response = await chai.request(app).get('/teams');
      expect(response.body).to.equal(teamsArrayMock.teams);
      expect(response.status).to.equal(200);
    });
    
    it('Buscar por id deve retornar um time', async () => {
      sinon.stub(Team, 'findOne').returns(teamMock as any);
      const id = 1;
      const response = await chai.request(app).get(`/teams/${id}`);
      expect(response.body).to.equal(teamMock);
      expect(response.status).to.equal(200);
    });
  });
 });