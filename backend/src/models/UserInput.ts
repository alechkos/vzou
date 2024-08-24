import { DataTypes, Model } from 'sequelize'
import { UserInputAttributes, UserInputT } from '../types/UserInputTypes.js'
import { sequelize } from '../db.js'

class UserInput extends Model<UserInputAttributes, UserInputT> implements UserInputAttributes {
  public userID!: number
  public subject!: string
  public algorithm!: string
  public actionDate!: Date
  public size!: number
  public input!: string
  public from!: string[]
  public to!: string[]
  public weight!: string[]
}

UserInput.init(
  {
    userID: { type: DataTypes.INTEGER, references: { model: 'Users', key: 'id' }, primaryKey: true },
    subject: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    algorithm: { type: DataTypes.STRING, allowNull: false },
    actionDate: { type: DataTypes.DATEONLY, allowNull: false },
    size: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1, primaryKey: true },
    input: { type: DataTypes.STRING, allowNull: true, primaryKey: true },
    from: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true, primaryKey: true },
    to: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true, primaryKey: true },
    weight: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true, primaryKey: true }
  },
  {
    sequelize: sequelize,
    timestamps: false
  }
)

export default UserInput
