import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import loginMock from '../helpers/mocks/login';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login', () => {
  describe('POST', () => {

    afterEach(() => {
      sinon.restore();
    });

    it('Deve efetuar login com sucesso', async () => {
      const response = await chai.request(app).post('/login').send(loginMock);
      expect(response.status).to.equal(200);
    });
    it('Deve retornar um token', async () => {
      const response = await chai.request(app).post('/login').send(loginMock);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('token');
    });
    it('Deve retornar mensagem de erro se email nao for preenchido', async () => {
      const response = await chai.request(app).post('/login').send({ ...loginMock, email: '' });
      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
    });
    it('Deve retornar mensagem de erro se password nao for preenchido', async () => {
      const response = await chai.request(app).post('/login').send({ ...loginMock, password: '' });
      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
    });
  });
 });