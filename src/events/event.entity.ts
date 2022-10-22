import { User } from "./../auth/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Attendee, AttendeeAnswerEnum } from "./attendee.entity";
import { Exclude, Expose } from "class-transformer";
import { PagiantionResult } from "./pagination/paginator";

export enum WhenEventFilter {
    All = 1,
    Today,
    Tomorrow,
    Thisweek,
    NextWeek
  }

@Entity('event')
export class Event{
    @PrimaryGeneratedColumn()
    id : number;

    @Column({length: 100})
    name : string;

    @Column({nullable: true})
    description: string;

    @Column()
    when : Date;

    @Column()
    address: string;

    @OneToMany( () => Attendee, (attendee) => attendee.event,{
        eager: true,
    })
    attendees: Attendee[]

    @ManyToOne( ()=> User, (user)=> user.organized)
    @JoinColumn({name: 'organizerId'})
    organizer: User;

    @Column()
    @Exclude()
    organizerId: number;
    
    attendeeCount ?: number;
    attendeeRejected ?: number;
    attendeeMaybe ?: number;
    attendeeAccepted ?: number;


    
}  


export type PaginatedEvent = PagiantionResult<Event>;