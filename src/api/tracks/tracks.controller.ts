import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/track-update.dto';
import { UpdateTrackDto } from './dto/track-create.dto';
import { UUIDParam } from '../../common/pipes/uuid.pipe';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllTracks() {
    return this.tracksService.getAllTracks();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getTrack(@UUIDParam('id') id: string) {
    const entity = this.tracksService.getTrack(id);

    return entity;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTrack(@Body() body: CreateTrackDto) {
    const entity = this.tracksService.createTrack(body);
    return entity;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateTrack(
    @UUIDParam('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.tracksService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@UUIDParam('id') id: string) {
    return this.tracksService.deleteTrack(id);
  }
}
