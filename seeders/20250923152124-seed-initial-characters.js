'use strict';
const axios = require('axios');
/** @type {import('sequelize-cli').Migration} */'use strict';

module.exports = {
  async up(queryInterface) {
    // 0) Limpieza de tablas (para no duplicar si corres varias veces en dev)
    await queryInterface.bulkDelete('EpisodeCharacters', null, {});
    await queryInterface.bulkDelete('Characters', null, {});
    await queryInterface.bulkDelete('Episodes', null, {});
    await queryInterface.bulkDelete('Locations', null, {});

    // 1) Obtener 15 personajes iniciales
    const { data: page1 } = await axios.get('https://rickandmortyapi.com/api/character?page=1');
    const chosen = page1.results.slice(0, 15);

    // 2) Procesar Locations (origin + location)
    const locationMap = new Map();
    for (const c of chosen) {
      const addLoc = (loc) => {
        if (!loc || !loc.url) return;
        const id = Number(loc.url.split('/').pop());
        if (!locationMap.has(id)) {
          locationMap.set(id, {
            id,
            name: loc.name || 'unknown',
            type: null,
            dimension: null,
            url: loc.url,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      };
      addLoc(c.origin);
      addLoc(c.location);
    }

    // Enriquecer locations pidiendo a la API
    const locIds = [...locationMap.keys()];
    if (locIds.length) {
      const { data: locs } = await axios.get(
        `https://rickandmortyapi.com/api/location/${locIds.join(',')}`
      );
      const arr = Array.isArray(locs) ? locs : [locs];
      for (const l of arr) {
        locationMap.set(l.id, {
          id: l.id,
          name: l.name,
          type: l.type,
          dimension: l.dimension,
          url: l.url,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }
    await queryInterface.bulkInsert('Locations', [...locationMap.values()], {});

    // 3) Procesar Episodes
    const epIdSet = new Set();
    chosen.forEach((c) => (c.episode || []).forEach((u) => epIdSet.add(Number(u.split('/').pop()))));
    const epIds = [...epIdSet];
    let episodesRows = [];
    if (epIds.length) {
      const { data: eps } = await axios.get(
        `https://rickandmortyapi.com/api/episode/${epIds.join(',')}`
      );
      const arr = Array.isArray(eps) ? eps : [eps];
      episodesRows = arr.map((e) => ({
        id: e.id,
        name: e.name,
        air_date: e.air_date,
        episode: e.episode,
        url: e.url,
        createdAt: new Date(),
        updatedAt: new Date()
      }));
      await queryInterface.bulkInsert('Episodes', episodesRows, {});
    }

    // 4) Procesar Characters
    const charRows = chosen.map((c) => {
      const originId = c.origin?.url ? Number(c.origin.url.split('/').pop()) : null;
      const locationId = c.location?.url ? Number(c.location.url.split('/').pop()) : null;
      return {
        id: c.id,
        name: c.name,
        status: c.status,
        species: c.species,
        type: c.type,
        gender: c.gender,
        originId,
        locationId,
        image: c.image,
        url: c.url,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });
    await queryInterface.bulkInsert('Characters', charRows, {});

    // 5) Tabla intermedia episode_characters
    const epCharRows = [];
    for (const c of chosen) {
      for (const u of c.episode || []) {
        epCharRows.push({
          episodeId: Number(u.split('/').pop()),
          characterId: c.id,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }
    await queryInterface.bulkInsert('EpisodeCharacters', epCharRows, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('EpisodeCharacters', null, {});
    await queryInterface.bulkDelete('Characters', null, {});
    await queryInterface.bulkDelete('Episodes', null, {});
    await queryInterface.bulkDelete('Locations', null, {});
  }
};