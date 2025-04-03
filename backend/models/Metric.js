import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Metric = sequelize.define("Metric", {
  search_term: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  poster_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  movie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
});

export default Metric;
