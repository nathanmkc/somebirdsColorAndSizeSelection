require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

//const sequelize = new Sequelize(`postgres://me:${process.env.DEV_DB_PASS}@${process.env.DEV_DB_HOST}:5432/sdc_somebirds_shoeinventory`);

const sequelize = new Sequelize('fec_somebirds_shoeinventory', 'ubuntu', process.env.DEV_DB_PASS, {
  host: process.env.DEV_DB_HOST,
  dialect: 'postgres',
  logging: false
});

const Shoes = sequelize.define("shoes", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  }
}, {
  freezeTableName: true,
  tableName: "shoes",
  timestamps: false
});

const Colors = sequelize.define("colors", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shoe_color: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sole_color: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shoe_hex: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sole_hex: {
    type: DataTypes.STRING,
    allowNull: false
  },
  limited: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}, {
  freezeTableName: true,
  tableName: "colors",
  timestamps: false
});

const Sizes = sequelize.define("sizes", {
  size: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  freezeTableName: true,
  tableName: "sizes",
  timestamps: false
});

const Quantities = sequelize.define("quantities", {
  shoe_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Shoes,
      key: 'model'
    }
  },
  color_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Colors,
      key: 'id'
    }
  },
  quantities: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true,
  tableName: "quantities",
  timestamps: false
});

module.exports = {
  Shoes: Shoes,
  Colors: Colors,
  Sizes: Sizes,
  Quantities: Quantities
};