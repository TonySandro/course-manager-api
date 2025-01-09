import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ModuleModel } from "./module";

@Entity("courses")
export class CourseModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column()
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ type: "varchar", length: 500, nullable: true })
  imageUrl?: string;

  @OneToMany(() => ModuleModel, (module) => module.course, {
    cascade: true,
    nullable: true,
  })
  modules?: ModuleModel[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
