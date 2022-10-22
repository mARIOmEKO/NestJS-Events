import { User } from "src/auth/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./event.entity";

export enum AttendeeAnswerEnum{
    Accepted = 1,
    Maybe,
    Rejected,
}

@Entity()
export class Attendee{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> Event, (event) => event.attendees, {nullable: false})
    @JoinColumn({name: 'eventId'})
    event: Event;

    @Column()
    eventId: number;

    @Column('enum',{
        enum : AttendeeAnswerEnum,
        default: AttendeeAnswerEnum.Accepted
    })
    answer: AttendeeAnswerEnum;

    @ManyToOne(()=> User, (user)=> user.attended)
    @JoinColumn({name: 'userId'})
    user: User;

    @Column()
    userId: number;
} 