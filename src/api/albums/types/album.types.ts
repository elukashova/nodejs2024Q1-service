import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

interface AlbumData {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export class Album implements AlbumData {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Innuendo' })
  name: string;

  @ApiPropertyOptional({ example: 1991 })
  year: number;

  @ApiPropertyOptional({ format: 'uuid', nullable: true })
  artistId: string | null;
}
