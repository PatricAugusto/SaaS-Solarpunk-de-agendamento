exports.up = (pgm) => {
  pgm.createExtension('pgcrypto', { ifNotExists: true }); // para gen_random_uuid()

  pgm.createTable('users', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    name: { type: 'varchar(120)', notNull: true },
    email: { type: 'varchar(160)', notNull: true, unique: true },
    password_hash: { type: 'text', notNull: true },
    username: { type: 'varchar(60)', notNull: true, unique: true }, // usado na URL pública
    timezone: { type: 'varchar(60)', notNull: true, default: 'America/Sao_Paulo' },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};