import { ApiProperty } from "@nestjs/swagger";

export class CreateActorDto {
  @ApiProperty({ example: 'Christoph Waltz' })
  readonly name: string;
  @ApiProperty({ example: '1956-10-04' })
  readonly birthday: string;
  @ApiProperty({ example: 'Wien' })
  readonly city: string;
  @ApiProperty({ example: 'Austria' })
  readonly country: string;
  @ApiProperty({ example: 'https://some-source.net', required: false })
  readonly photo_src?: string;
}
