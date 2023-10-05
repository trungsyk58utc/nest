import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity('countries')
export class Country extends AbstractEntity<Country> {
  @Column({ nullable: false })
  country_name: string;

  @Column({ nullable: false })
  capital_city: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
