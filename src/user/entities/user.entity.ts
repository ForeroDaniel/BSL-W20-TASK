import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
@PrimaryGeneratedColumn('uuid')
id: string;

@Column('text', {unique: true})
email: string;

@Column('text')
fullname: string

@Column('text')
password: string

@Column('bool', {default: true})
active: boolean

@Column('simple-array', {default: 'user'})
roles: string[]
}
