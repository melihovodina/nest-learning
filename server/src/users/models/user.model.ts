import { ApiProperty } from "@nestjs/swagger";
import {Model, Column, DataType, Table, BelongsToMany } from "sequelize-typescript";
import { Role } from "src/roles/models/role.model";
import { UserRoles } from "src/roles/models/userRoles.model";

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({example: '1', description: 'id'})
  @Column({
    type: DataType.INTEGER, 
    unique: true, 
    autoIncrement: true, 
    primaryKey: true
  })
  id: number;

  @ApiProperty({example: "email@gmail.com", description: "user's email"})
  @Column({
    type: DataType.STRING, 
    unique: true, 
    allowNull: false
  })
  email: string;

  @ApiProperty({example: "strongPassword", description: "user's password"})
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password: string;

  @ApiProperty({example: "true", description: "user's access status"})
  @Column({
    type: DataType.BOOLEAN,  
    defaultValue: false
  })
  banned: boolean;

  @ApiProperty({example: "arguing", description: "ban reason"})
  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  banReason: string;
  
  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}