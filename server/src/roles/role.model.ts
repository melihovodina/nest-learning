import { ApiProperty } from "@nestjs/swagger";
import { Model, Column, DataType, Table, BelongsToMany } from "sequelize-typescript";
import { User } from "src/users/user.model";
import { UserRoles } from "./userRoles.model";

interface RoleCreationAttrs {
  value: string;
  description: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({example: '1', description: 'id'})
  @Column({
    type: DataType.INTEGER, 
    unique: true, 
    autoIncrement: true, 
    primaryKey: true
  })
  id: number;

  @ApiProperty({example: "admin", description: "role's value"})
  @Column({
    type: DataType.STRING, 
    unique: true, 
    allowNull: false
  })
  value: string;

  @ApiProperty({example: "all privileges available", description: "role's description"})
  @Column({
    type: DataType.STRING, 
    unique: true, 
    allowNull: false
  })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}