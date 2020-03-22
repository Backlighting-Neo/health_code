import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index
} from "typeorm";

@Entity('health_code_field')
export class Field {
  @PrimaryGeneratedColumn({ comment: '自增编号' })
  id: number;

  @Index({ unique: true })
  @Column({ comment: '键值' })
  key: string;

  @Column({ comment: '名字' })
  name: string;

  @Column({ comment: '备注' })
  content: string;

  @Column({ comment: '数据类型' })
  dataType: string;

  @Column('json', { comment: '附加数据', default: null })
  extra: any;

  @Column({ comment: '是否允许空', default: true })
  nullable: Boolean;

  @CreateDateColumn({ comment: '创建时间' })
  create_time: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  update_time: Date;
}