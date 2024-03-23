import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

interface ArtistData {
  id: string;
  name: string;
  grammy: boolean;
}

export class Artist implements ArtistData {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Freddie Mercury' })
  name: string;

  @ApiPropertyOptional({ example: false })
  grammy: boolean;
}
