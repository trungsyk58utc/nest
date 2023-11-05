import { ApiProperty } from '@nestjs/swagger';

export class CreateCountryDto {
  @ApiProperty()
  country: string;

  @ApiProperty()
  capital_city: string;
}
