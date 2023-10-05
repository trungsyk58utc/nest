import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAuthTable1696431920617 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'auth',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'token',
            type: 'varchar',
          },
          {
            name: 'user_id',
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
    await queryRunner.dropTable('auth');
  }
}
