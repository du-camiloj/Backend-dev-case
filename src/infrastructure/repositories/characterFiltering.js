const { Op } = require('sequelize');
const { Character, Episode, Location } = require('../db/sequelize');

class characterFiltering {
  async search({ name, status, species, gender, originId, locationId }, { limit=20, offset=0 }) {
    
    const where = {};
    if (name) where.name = { [Op.iLike]: `%${name}%` };
    if (status) where.status = status;
    if (species) where.species = species;
    if (gender) where.gender = gender;
    if (originId) where.originId = originId;
    if (locationId) where.locationId = locationId;

    const { rows, count } = await Character.findAndCountAll({
      where,
      include: [
        { model: Location, as: 'origin' },
        { model: Location, as: 'location' },
        { model: Episode, as: 'episodes', through: { attributes: [] } }
      ],
      order: [['id', 'ASC']],
      limit, offset
    });
    return { items: rows, total: rows.length };
  }

  async findById(id) {
    if (!id) return null;
    const character = await Character.findByPk(id, {
      include: [
        { model: Location, as: 'origin' },
        { model: Location, as: 'location' },
        { model: Episode, as: 'episodes', through: { attributes: [] } }
      ]
    });
    return character;
  }

  async findByIds(ids = []) {
    if (!ids || !ids.length) return [];
    const parsed = ids.map((x) => Number(x)).filter((n) => !Number.isNaN(n));
    if (!parsed.length) return [];
    const characters = await Character.findAll({
      where: { id: parsed },
      include: [
        { model: Location, as: 'origin' },
        { model: Location, as: 'location' },
        { model: Episode, as: 'episodes', through: { attributes: [] } }
      ],
      order: [['id', 'ASC']]
    });
    return characters;
  }
}
module.exports = new characterFiltering();
