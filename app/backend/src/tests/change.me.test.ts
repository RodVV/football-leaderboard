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

describe('/login', () => {
  describe('POST', () => {

    afterEach(() => {
      sinon.restore();
    });

    it('Deve efetuar login com sucesso', async () => {
      const response = await chai.request(app).post('/login').send(userMock);
      expect(response.status).to.equal(200);
    });
    it('Deve retornar um token', async () => {
      const response = await chai.request(app).post('/login').send(userMock);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('token');
    });
    it('Deve retornar mensagem de erro se email nao for preenchido', async () => {
      const response = await chai.request(app).post('/login').send({ ...userMock, email: '' });
      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
    });
    it('Deve retornar mensagem de erro se password nao for preenchido', async () => {
      const response = await chai.request(app).post('/login').send({ ...userMock, password: '' });
      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
    });
    it('Deve retornar mensagem de erro se email nao for valido', async () => {
      const response = await chai.request(app).post('/login').send({ ...userMock, email: 'aaaaaaaaa' });
      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({ message: 'Incorrect email or password' });
    });
  });

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