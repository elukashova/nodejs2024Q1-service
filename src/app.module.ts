import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './api/users/users.module';
import { ArtistsModule } from './api/artists/artists.module';
import { TracksService } from './api/tracks/tracks.service';
import { TracksModule } from './api/tracks/tracks.module';

@Module({
  imports: [UsersModule, ArtistsModule, TracksModule],
  controllers: [AppController],
  providers: [AppService, TracksService],
})
export class AppModule {}
