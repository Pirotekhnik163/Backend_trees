import {BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Entity('cities')
export class CitiesEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    city: string;
}