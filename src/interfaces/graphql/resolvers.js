const SearchCharacters = require('../../application/SearchCharactersUseCase');

module.exports = {
  Query: {
    characters: async (_, { filter, limit, offset }) =>
      await SearchCharacters.execute(filter || {}, { limit, offset })
  }
};
