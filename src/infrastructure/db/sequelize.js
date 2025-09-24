const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false
});

const db = {};

// Carga todos los modelos que estén en src/infrastructure/db/models/*.js
const modelsDir = path.join(__dirname, 'models');

fs.readdirSync(modelsDir)
  .filter((f) => f.endsWith('.js'))
  .forEach((file) => {
    const defineModel = require(path.join(modelsDir, file));
    const model = defineModel(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Ejecuta asociaciones si existen
Object.values(db).forEach((model) => {
  if (typeof model.associate === 'function') {
    model.associate(db);
  }
});

// Exporta conexión + modelos
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
