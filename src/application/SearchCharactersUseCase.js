const cache = require('../infrastructure/cache/redis');
const CharacterRepo = require('../infrastructure/repositories/characterFiltering');

class SearchCharactersUseCase {
  async execute(filter = {}, pagination = {}) {
    // const key = `characters:${JSON.stringify({filter, pagination})}`;
    // const cached = await cache.get(key);
    // if (cached) return cached;

    const result = await CharacterRepo.search(filter, pagination);
    // await cache.set(key, result);
    return result;
  }
}
module.exports = new SearchCharactersUseCase();
