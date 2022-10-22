import { IsOptional, IsString } from "class-validator";
import { WhenEventFilter } from "../event.entity";


export class ListEvents {
    @IsOptional()
    when : WhenEventFilter =WhenEventFilter.All;
    @IsOptional()
    page : number =1;
  }
  
 