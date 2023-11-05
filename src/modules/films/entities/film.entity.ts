import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity('films')
export class Film extends AbstractEntity<Film> {
  @Column()
  name: string;

  @Column()
  actor: string;

  @Column()
  year: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
