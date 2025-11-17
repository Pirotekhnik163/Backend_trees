import {BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Entity('share')
export class ShareEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    city: string;

    @Index()
    @Column()
    special: string;

    @Column()
    price: number;
}