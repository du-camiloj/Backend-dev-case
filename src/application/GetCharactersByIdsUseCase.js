const cache = require('../infrastructure/cache/redis');
const CharacterRepo = require('../infrastructure/repositories/characterFiltering');
const { Character, Location, Episode } = require('../infrastructure/db/sequelize');

class GetCharactersByIdsUseCase {
  async execute(ids) {
    const sortedIds = [...ids].sort((a, b) => a - b);
    const key = `characters:${sortedIds.join(',')}`;
    const cached = await cache.get(key);
    if (cached) return cached;

    const result = await CharacterRepo.findByIds(sortedIds);
    await cache.set(key, result);
    return result;
  }
}

module.exports = new GetCharactersByIdsUseCase();