import { Event } from "./../events/event.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { Exclude } from "class-transformer";
import { Attendee } from "src/events/attendee.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique: true})
    username : string;

    @Column()
    @Exclude()
    password: string;

    @Column({unique: true})
    email: string;

    @Column()
    firstName : string;

    @Column()
    lastname : string;


    @OneToOne(()=>Profile)
    @JoinColumn()
    profile: Profile;

    @OneToMany(()=> Event, (event)=> event.organizer)
    organized: Event[]

    @OneToMany(()=> Attendee, (attendee)=> attendee.user)
    @Exclude()
    attended: Attendee[]
}