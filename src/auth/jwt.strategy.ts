import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){
    super({
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: true,
        secretOrKey: process.env.AUTH_SECRET,

    });
    }

    async validate(payload: any){
        return await this.userRepository.findOne({where: {id: payload.sub}, select : ['password','email','id','username']});
        // .createQueryBuilder('u')
        // .where('u.id = :id', {id: payload.sub})
        // .select(['u.id','u.username', 'u.firstName', 'u.email'])
        // .getOne();
    }
}