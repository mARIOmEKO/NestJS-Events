import { ClassSerializerInterceptor, Controller, Get, Param, ParseIntPipe, Query, SerializeOptions, UseInterceptors } from "@nestjs/common";
import { EventsService } from "./events.service";

@Controller('events-organized-by-user/:userId')
@SerializeOptions({strategy: 'exposeAll'})
export class EventsOrganizedByUserController{
    constructor(
        private readonly eventsService: EventsService
    ){}

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    async findAll(@Param('userId', ParseIntPipe) userId:number, @Query('page') page=1){
        return await this.eventsService.getEventsOrganizedByUserIdPaginated(
            userId,
            {currentPage: page,
                limit: 5,
            })
    }
}