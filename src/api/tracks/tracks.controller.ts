import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/track-create.dto';
import { UpdateTrackDto } from './dto/track-update.dto';
import { UUIDParam } from '../../common/pipes/uuid.pipe';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { Track } from './types/track.types';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  @ApiOperation({
    summary: 'Get tracks list',
    description: 'Gets all library tracks list',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: Track,
    isArray: true,
  })
  getAllTracks() {
    return this.tracksService.getAllTracks();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get single track by id',
    description: 'Get single track by id',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ description: 'Successful operation', type: Track })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track was not found' })
  getTrack(@UUIDParam('id') id: string) {
    const entity = this.tracksService.getTrack(id);

    return entity;
  }

  @Post()
  @ApiOperation({
    summary: 'Add new track',
    description: 'Add new track information',
  })
  @ApiBody({ type: CreateTrackDto })
  @ApiCreatedResponse({ description: 'Track is created', type: Track })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  @UsePipes(ValidationPipe)
  createTrack(@Body() body: CreateTrackDto) {
    const entity = this.tracksService.createTrack(body);
    return entity;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update track information',
    description: 'Update library track information by UUID',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiBody({ type: UpdateTrackDto })
  @ApiOkResponse({ description: 'The track has been updated', type: Track })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track not found' })
  @UsePipes(ValidationPipe)
  updateTrack(
    @UUIDParam('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.tracksService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete track',
    description: 'Deletes track from library',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@UUIDParam('id') id: string) {
    return this.tracksService.deleteTrack(id);
  }
}
