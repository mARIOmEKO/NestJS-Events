import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormConfig from './config/orm.config';
import ormConfigProd from './config/orm.config.prod';
import { Event } from './events/event.entity';
import { EventsController } from './events/events.controller';
import { EventsModule } from './events/events.module';
import { SchoolModule } from './school/school.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: process.env.NODE_ENV !== 'production' ? ormConfig : ormConfigProd
}),
  EventsModule,
  SchoolModule,
  AuthModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
