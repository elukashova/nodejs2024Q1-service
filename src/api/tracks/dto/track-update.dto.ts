import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUUID()
  albumId: string;

  @IsOptional()
  @IsUUID()
  artistId: string;

  @IsInt()
  @IsNotEmpty()
  duration: number;
}
