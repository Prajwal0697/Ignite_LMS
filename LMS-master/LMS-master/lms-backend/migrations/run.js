"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../src/config/db");
async function runMigrations() {
    console.log('🔄 Running migrations...');
    await db_1.db.schema.createTableIfNotExists('users', (t) => {
        t.bigIncrements('id').primary();
        t.string('email', 255).notNullable().unique();
        t.string('password_hash', 512).notNullable();
        t.string('name', 255).notNullable();
        t.timestamps(true, true);
        t.index('email');
    });
    await db_1.db.schema.createTableIfNotExists('subjects', (t) => {
        t.increments('id').primary();
        t.string('title', 255).notNullable();
        t.string('slug', 255).notNullable().unique();
        t.text('description');
        t.string('thumbnail_url', 512);
        t.boolean('is_published').defaultTo(false);
        t.timestamps(true, true);
        t.index('slug');
    });
    await db_1.db.schema.createTableIfNotExists('sections', (t) => {
        t.increments('id').primary();
        t.integer('subject_id').unsigned().notNullable().references('id').inTable('subjects').onDelete('CASCADE');
        t.string('title', 255).notNullable();
        t.integer('order_index').notNullable();
        t.timestamps(true, true);
        t.unique(['subject_id', 'order_index']);
    });
    await db_1.db.schema.createTableIfNotExists('videos', (t) => {
        t.increments('id').primary();
        t.integer('section_id').unsigned().notNullable().references('id').inTable('sections').onDelete('CASCADE');
        t.string('title', 255).notNullable();
        t.text('description');
        t.string('youtube_url', 512).notNullable();
        t.integer('order_index').notNullable();
        t.integer('duration_seconds').nullable();
        t.timestamps(true, true);
        t.unique(['section_id', 'order_index']);
    });
    await db_1.db.schema.createTableIfNotExists('enrollments', (t) => {
        t.increments('id').primary();
        t.bigInteger('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        t.integer('subject_id').unsigned().notNullable().references('id').inTable('subjects').onDelete('CASCADE');
        t.timestamp('created_at').defaultTo(db_1.db.fn.now());
        t.unique(['user_id', 'subject_id']);
    });
    await db_1.db.schema.createTableIfNotExists('video_progress', (t) => {
        t.increments('id').primary();
        t.bigInteger('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        t.integer('video_id').unsigned().notNullable().references('id').inTable('videos').onDelete('CASCADE');
        t.integer('last_position_seconds').defaultTo(0);
        t.boolean('is_completed').defaultTo(false);
        t.timestamp('completed_at').nullable();
        t.timestamps(true, true);
        t.unique(['user_id', 'video_id']);
    });
    await db_1.db.schema.createTableIfNotExists('refresh_tokens', (t) => {
        t.increments('id').primary();
        t.bigInteger('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        t.string('token_hash', 512).notNullable();
        t.timestamp('expires_at').notNullable();
        t.timestamp('revoked_at').nullable();
        t.timestamp('created_at').defaultTo(db_1.db.fn.now());
        t.index(['user_id', 'token_hash']);
    });
    console.log('✅ Migrations complete!');
    await db_1.db.destroy();
}
runMigrations().catch((err) => {
    console.error('❌ Migration failed:', err);
    process.exit(1);
});
//# sourceMappingURL=run.js.map