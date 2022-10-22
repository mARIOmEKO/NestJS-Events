import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Post, SerializeOptions, UseInterceptors } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./input/create.user.dto";
import { User } from "./user.entity";

@Controller('users')
@SerializeOptions({strategy : 'exposeAll'})

export class UsersController{
    constructor(
        private readonly authService: AuthService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){}
    
    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    async create(@Body() createUserDto : CreateUserDto){
        const user = new User();

        if(createUserDto.password !== createUserDto.retypedpassword){
            throw new BadRequestException(['Password doesnt match']);
        }

        const matchedUser = await this.userRepository.findOne({where: [{username: createUserDto.username}, {email: createUserDto.email}]})
        if (matchedUser) {
            throw new BadRequestException(['User already exist'])
        }
        
        user.username = createUserDto.username;
        user.password = await this.authService.hashPassword(createUserDto.password);
        user.email = createUserDto.email;
        user.firstName = createUserDto.firstName;
        user.lastname = createUserDto.lastName;
        return{
            // userid : user.id,
            user : await this.userRepository.save(user),
            token : this.authService.getUserToken(user)
            
        }
    }
}