import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({example: "admin", description: "role's value"})
  readonly value: string;

  @ApiProperty({example: "all privileges available", description: "role's description"})
  readonly description: string;
}