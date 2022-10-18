import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import LeaderboardService from '../services/LeaderboardService';

chai.use(chaiHttp);

const { expect } = chai;

const leaderboardService = new LeaderboardService();

describe('/leaderboard', () => {
  describe('GET leaderboard/home', () => {

    afterEach(() => {
      sinon.restore();
    });

    it('Deve retornar status 200 e conter todas as informacoes', async () => {
      const response = await chai.request(app).get('/leaderboard/home');
      expect(response.body).to.be.an('array');
      expect(response.status).to.equal(200);
      expect(response.body[0]).to.have.all.keys([
        'name',
        'totalPoints',
        'totalGames',
        'totalVictories',
        'totalDraws',
        'totalLosses',
        'goalsFavor',
        'goalsOwn',
        'goalsBalance',
        'efficiency']);
    });    
  });

  describe('GET leaderboard/away', () => {

    afterEach(() => {
      sinon.restore();
    });

    it('Deve retornar status 200 e conter todas as informacoes', async () => {
      const response = await chai.request(app).get('/leaderboard/away');
      expect(response.body).to.be.an('array');
      expect(response.status).to.equal(200);
      expect(response.body[0]).to.have.all.keys([
        'name',
        'totalPoints',
        'totalGames',
        'totalVictories',
        'totalDraws',
        'totalLosses',
        'goalsFavor',
        'goalsOwn',
        'goalsBalance',
        'efficiency']);
    });    
  });
 });