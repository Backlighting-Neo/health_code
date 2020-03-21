import {
  Entity,
  PrimaryColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@Entity('health_code_administrator')
export class Administrator {
  @PrimaryColumn({ comment: '自增编号' })
  id: string;

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