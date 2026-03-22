import { db } from '../src/config/db';

async function runMigrations() {
  console.log('🔄 Running Knex migrations for MySQL...');

  try {
    const ensureTable = async (tableName: string, callback: (t: any) => void) => {
      if (!(await db.schema.hasTable(tableName))) {
        await db.schema.createTable(tableName, callback);
      }
    };

    await ensureTable('users', (t) => {
      t.increments('id').primary();
      t.string('email', 255).notNullable().unique();
      t.string('password_hash', 512).notNullable();
      t.string('name', 255).notNullable();
      t.timestamps(true, true);
    });

    await ensureTable('subjects', (t) => {
      t.increments('id').primary();
      t.string('title', 255).notNullable();
      t.string('slug', 255).notNullable().unique();
      t.text('description');
      t.string('thumbnail_url', 512);
      t.string('instructor_name', 255);
      t.string('category', 100);
      t.boolean('is_published').defaultTo(false);
      t.timestamps(true, true);
    });

    await ensureTable('sections', (t) => {
      t.increments('id').primary();
      t.integer('subject_id').unsigned().notNullable().references('id').inTable('subjects').onDelete('CASCADE');
      t.string('title', 255).notNullable();
      t.integer('order_index').notNullable();
      t.timestamps(true, true);
    });

    await ensureTable('videos', (t) => {
      t.increments('id').primary();
      t.integer('section_id').unsigned().notNullable().references('id').inTable('sections').onDelete('CASCADE');
      t.string('title', 255).notNullable();
      t.string('youtube_url', 512).notNullable();
      t.integer('order_index').notNullable();
      t.integer('duration_seconds');
      t.timestamps(true, true);
    });

    await ensureTable('enrollments', (t) => {
      t.increments('id').primary();
      t.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
      t.integer('subject_id').unsigned().notNullable().references('id').inTable('subjects').onDelete('CASCADE');
      t.timestamp('created_at').defaultTo(db.fn.now());
    });

    await ensureTable('video_progress', (t) => {
      t.increments('id').primary();
      t.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
      t.integer('video_id').unsigned().notNullable().references('id').inTable('videos').onDelete('CASCADE');
      t.integer('last_position_seconds').defaultTo(0);
      t.boolean('is_completed').defaultTo(false);
      t.timestamp('completed_at');
      t.timestamps(true, true);
    });

    await ensureTable('refresh_tokens', (t) => {
      t.increments('id').primary();
      t.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
      t.string('token_hash', 512).notNullable();
      t.timestamp('expires_at').notNullable();
      t.timestamp('revoked_at');
      t.timestamp('created_at').defaultTo(db.fn.now());
    });
    
    await ensureTable('chat_history', (t) => {
      t.increments('id').primary();
      t.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
      t.string('role', 10).notNullable();
      t.text('content').notNullable();
      t.timestamp('created_at').defaultTo(db.fn.now());
    });

    console.log('✅ MySQL Migrations complete!');
  } catch (err: any) {
    console.error('❌ Migration failed:', err.message);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

runMigrations();
