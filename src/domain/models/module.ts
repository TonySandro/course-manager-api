import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("modules")
export class ModuleModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "int" })
  orderNumber: number;

  //   @ManyToOne(() => CourseModel, (course) => course.modules, {
  //     onDelete: "CASCADE",
  //   })
  //   course: CourseModel;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
