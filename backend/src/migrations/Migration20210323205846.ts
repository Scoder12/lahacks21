import { Migration } from '@mikro-orm/migrations';

export class Migration20210323205846 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "password" text not null;');
  }

}
