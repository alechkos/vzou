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
}

UserInput.init(
  {
    userID: { type: DataTypes.INTEGER, references: { model: 'Users', key: 'id' } },
    subject: { type: DataTypes.STRING, allowNull: false },
    algorithm: { type: DataTypes.STRING, allowNull: false },
    actionDate: { type: DataTypes.DATEONLY, allowNull: false },
    size: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    input: { type: DataTypes.STRING, allowNull: false }
  },
  {
    sequelize: sequelize,
    timestamps: false
  }
)

export default UserInput
