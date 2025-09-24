const { createClient } = require('redis');
const { REDIS_URL, CACHE_TTL_SECONDS } = process.env;

const redis = createClient({ 
    url: REDIS_URL 
});

redis.on('error', (
    e) => console.error('Redis error:', e)
);

async function ensure() { 
    if (!redis.isOpen) await redis.connect(); 
}

async function get(key) { 
    await ensure(); 
    const v = await redis.get(key); 
    return v ? JSON.parse(v) : null; 
}

async function set(key, value, ttl = CACHE_TTL_SECONDS) { 
    await ensure(); 
    await redis.set(key, JSON.stringify(value), { EX: +ttl }); 
}

module.exports = { 
    get, 
    set 
};
