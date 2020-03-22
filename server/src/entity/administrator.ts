import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@Entity('health_code_administrator')
export class Administrator {
  @PrimaryGeneratedColumn({ comment: '自增编号' })
  id: number;

  @Index()
  @Column({ comment: '账号' })
  username: string;

  @Column({ comment: 'md5密码' })
  password: string;

  @CreateDateColumn({ comment: '创建时间' })
  create_time: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  update_time: Date;
}