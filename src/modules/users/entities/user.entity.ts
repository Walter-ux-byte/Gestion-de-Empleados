import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Persona } from "../../persona/entities/persona.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    mail!: string;

    @Column()
    password!: string;

    @OneToOne(() => Persona, persona => persona.user, { cascade: true })
    persona!: Persona;
}
