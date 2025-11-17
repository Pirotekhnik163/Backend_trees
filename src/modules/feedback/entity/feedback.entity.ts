import {BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Entity('feedback')
export class FeedbackEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    name: string;

    @Index()
    @Column()
    email: string;

    @Column()
    phone: string;
}