import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { registerAs } from '@nestjs/config'
import { Event } from "./../events/event.entity";
import { Attendee } from "./../events/attendee.entity";

export default registerAs('orm.config',() : TypeOrmModuleOptions=> ({
    type : 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username : process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Event,Attendee],
    synchronize: false,
  }));