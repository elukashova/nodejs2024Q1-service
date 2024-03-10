import { PickType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './track-update.dto';

export class UpdateTrackDto extends PickType(CreateTrackDto, [
  'albumId',
  'artistId',
  'duration',
  'name',
]) {}
