import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Createactortable1696429809544 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'actors',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'actor_name',
            type: 'varchar',
          },
          {
            name: 'country_id',
            type: 'int',
          },
          {
            name: 'create_at',
            type: 'timestamp',
          },
          {
            name: 'update_at',
            type: 'timestamp',
          },
          // Add more columns as needed
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('actors');
  }
}
