import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@Entity('health_code_field')
export class Field {
  @PrimaryColumn({ comment: '自增编号' })
  id: string;

  @Column({ comment: '名字' })
  name: string;

  @Column({ comment: '备注' })
  content: string;

  @Column({ comment: '数据类型' })
  dataType: string;

  @Column({ comment: '是否允许空', default: true })
  nullable: Boolean;

  @CreateDateColumn({ comment: '创建时间' })
  create_time: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  update_time: Date;
}