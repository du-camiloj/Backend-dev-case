const { makeExecutableSchema } = require('@graphql-tools/schema');
const resolvers = require('./resolvers');

const typeDefs = /* GraphQL */ `
  type Location { 
    id: ID!, 
    name: String, 
    type: String, 
    dimension: String, 
    url: String, 
    residents: [Character!]!
  }

  type Episode { 
    id: ID!, 
    name: String, 
    air_date: String, 
    episode: String,
    url: String 
  }

  type Character {
    id: ID!, 
    name: String!, 
    status: String, 
    species: String, 
    type: String, 
    gender: String,
    url: String, 
    image: String, 
    origin: Location, 
    location: Location, 
    episodes: [Episode!]!
  }

  input CharacterFilter {
    name: String
    status: String
    species: String
    gender: String
    originId: Int
    locationId: Int
  }

  type CharacterPage { 
    items: [Character!]!, 
    total: Int! 
  }

  type Query {
    characters(filter: CharacterFilter, limit: Int = 20, offset: Int = 0): CharacterPage!
  }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
