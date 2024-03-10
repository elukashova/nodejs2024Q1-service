import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './api/users/users.module';
import { ArtistsModule } from './api/artists/artists.module';
import { TracksService } from './api/tracks/tracks.service';
import { TracksModule } from './api/tracks/tracks.module';
import { AlbumsController } from './api/albums/albums.controller';
import { AlbumsModule } from './api/albums/albums.module';

@Module({
  imports: [UsersModule, ArtistsModule, TracksModule, AlbumsModule],
  controllers: [AppController, AlbumsController],
  providers: [AppService, TracksService],
})
export class AppModule {}
