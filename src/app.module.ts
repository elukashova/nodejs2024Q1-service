import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './api/users/users.module';
import { ArtistsModule } from './api/artists/artists.module';

@Module({
  imports: [UsersModule, ArtistsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
