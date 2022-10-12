import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
  @ApiProperty({ example: 'Action' })
  readonly name: string;
}
