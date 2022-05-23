const {createClient} = require('redis');
const client = createClient({
    url: `redis://${process.env.REDIS_ENDPOINT_URI}`,
    password: `${process.env.REDIS_PASSWORD}`
});

client.on('error', (err) => console.log('Redis Client Error', err));

async function setRedis(key,value,timeout = 60 * 60){
    await client.connect();
    let result = await client.set(key, value);
    client.expire(key, timeout);
    return result;
}

async function getRedis (key){
    await client.connect();
    const value = await client.get(key);
    return value;
}
module.exports = {setRedis,getRedis}


