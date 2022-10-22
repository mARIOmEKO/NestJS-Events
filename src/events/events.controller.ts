import { Event } from './event.entity';
import { Body, Controller, Delete, Get, HttpCode, Logger, NotFoundException, Param, UsePipes,ValidationPipe, Patch, Post, Query, UseGuards, SerializeOptions, UseInterceptors,ClassSerializerInterceptor, ParseIntPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthGuardJwt } from "src/auth/auth-guard.jwt";
import { CurrentUser } from "src/auth/current-user.decorator";
import { User } from "src/auth/user.entity";
import { EventsService } from "./events.service";
import { CreateEventDto } from './input/create-event.dto';
import { ListEvents } from "./input/list.events";
import { UpdateEventDto } from "./input/update-event.dto";

@Controller('/events')
@SerializeOptions({strategy: 'exposeAll'})
export class EventsController {
  private readonly logger = new Logger(EventsController.name);

  constructor(
    private readonly eventsService: EventsService
  ) { }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes (new ValidationPipe ({ transform: true }))
  async findAll(@Query() filter : ListEvents  ) {
    const events = await this.eventsService
      .getEventsWithAttendeeCountFilteredPaginated(filter, {
        total: true,
        currentPage: filter.page,
        limit: 3
      });
    return events;
  }

    // @Get('practice2')
    // async practice2(){
    //     // return await this.eventRepository.findOne({where: {id:1}});
    //     const event = new Event();
    //     event.id = 1

    //     // const event = await this.eventRepository.findOne({where: {id:1}});
    //     const attendee= new Attendee();
    //     attendee.name = 'Mario Meko';
    //     attendee.event = event;

    //     await this.attendeeRepository.save(attendee);
    //     return event;

    // }
    
    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    async findOne(@Param('id', ParseIntPipe) id){
        const event = await this.eventsService.getEventWithAttendeeCount(id);
        if(!event){
            throw new NotFoundException();
        }
        return event;
    }

    @Post()
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async create(@Body() input: CreateEventDto, @CurrentUser() user:User){
        return await this.eventsService.createEvent(input,user);
    }

    @Patch(':id')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async update(@Param('id', ParseIntPipe) id, @Body() input: UpdateEventDto, @CurrentUser() user:User){
        const event= await this.eventsService.findOne(id);
        if(!event){
            throw new NotFoundException();
        }
        if(event.organizerId !== user.id){
            throw new NotFoundException('Eventi seshte i joti o qyp')
        }
        return await this.eventsService.updateEvent(event, input);
    }
    
    @Delete(':id')
    @HttpCode(204)
    @UseGuards(AuthGuardJwt)
    async remove(@Param('id', ParseIntPipe) id, @CurrentUser() user: User){
        const event= await this.eventsService.findOne(id);
        if(!event){
            throw new NotFoundException();
        }
        if(event.organizerId !== user.id){
            throw new NotFoundException('Eventi seshte i joti per tu fshire o shok')
        }
        await this.eventsService.deleteEvent(id);
        
    }

}