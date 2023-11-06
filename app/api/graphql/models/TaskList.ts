import {Model, Sequelize, DataTypes} from 'sequelize';
import {faker} from '@faker-js/faker';

export default function _TaskList(sequelize: Sequelize) {
  class TaskList extends Model {
    declare id: number;
    declare userId: number;
    declare name: string;
  }

  const adjective = faker.word.adjective();
  const interjection = faker.word.interjection();
  const phrase = adjective + '-' + interjection;

  TaskList.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        defaultValue: phrase,
      },
    },
    {
      tableName: 'TaskList',
      sequelize, // passing the `sequelize` instance is required
    }
  );

  TaskList.sync();

  return TaskList;
}
