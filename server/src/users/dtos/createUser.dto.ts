import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({example: "email@gmail.com", description: "user's email"})
  @IsString({message: 'should be a string'})
  @IsEmail({}, { message: 'must be a valid email' })
  readonly email: string;

  @ApiProperty({example: "strongPassword", description: "user's password"})
  @IsString({message: 'should be a string'})
  @Length(4, 16, { message: 'should be above 4 and 16 chars' })
  readonly password: string;
}