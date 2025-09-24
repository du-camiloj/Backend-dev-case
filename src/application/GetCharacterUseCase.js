const cache = require('../infrastructure/cache/redis');
const CharacterRepo = require('../infrastructure/repositories/characterFiltering');
const { Character, Location, Episode } = require('../infrastructure/db/sequelize');

class GetCharacterUseCase {
  async execute(id) {
    const key = `character:${id}`;
    const cached = await cache.get(key);
    if (cached) return cached;
    
    const result = await CharacterRepo.findById(id);
    await cache.set(key, result);    
    return result;
  }
}

module.exports = new GetCharacterUseCase();