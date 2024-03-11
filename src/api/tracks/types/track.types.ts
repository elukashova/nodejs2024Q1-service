import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

interface TrackData {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export class Track implements TrackData {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'The Show Must Go On' })
  name: string;

  @ApiPropertyOptional({ format: 'uuid', nullable: true })
  artistId: string | null;

  @ApiPropertyOptional({ format: 'uuid', nullable: true })
  albumId: string | null;

  @ApiProperty({ description: 'In seconds', example: 262 })
  duration: number;
}
