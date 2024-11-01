import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({example: "email@gmail.com", description: "user's email"})
  readonly email: string;

  @ApiProperty({example: "strongPassword", description: "user's password"})
  readonly password: string;
}