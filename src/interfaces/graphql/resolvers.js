const SearchCharacters = require('../../application/SearchCharactersUseCase');
const GetCharacter = require('../../application/GetCharacterUseCase');
const GetCharactersByIds = require('../../application/GetCharactersByIdsUseCase');

module.exports = {
  Query: {
    characters: async (_, { filter, limit, offset }) => await SearchCharacters.execute(filter || {}, { limit, offset }),

    character: async (_, { id }) => await GetCharacter.execute(id),

    charactersByIds: async (_, { ids }) => await GetCharactersByIds.execute(ids)
  }
};
