require('dotenv').config()
var redis = require('redis');
const asyncRedis = require("async-redis");
let redisClient = null

const getRedis = () => {
  if (redisClient) return redisClient

  const baseRedis = redis.createClient({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT });
  redisClient = asyncRedis.decorate(baseRedis);

  redisClient.on('connect', () => console.log('Conectado a Redis Server'))

  populateConstants(redisClient)
  return redisClient
}

const populateConstants = async (redisClient) => {
  await redisClient.hset("PLAYERS", "white", "0");
  await redisClient.hset("PLAYERS", "black", "1");
  await redisClient.hset("GAME_DATA_STATE", "move", "move");
  await redisClient.hset("GAME_DATA_STATE", "initGame", "initGame");
  await redisClient.hset("GAME_DATA_STATE", "waitForPlayer", "waitForPlayer");
}

const getRedisData = async () => {
  const redisClient = getRedis()
  const PLAYERS = await redisClient.hgetall("PLAYERS");
  const GAME_DATA_STATE = await redisClient.hgetall("PLAYERS");
  return { PLAYERS, GAME_DATA_STATE };
}


module.exports = {
  getRedis: getRedis(),
  getRedisData
}