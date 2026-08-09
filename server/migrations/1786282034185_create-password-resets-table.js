exports.up = (pgm) => {
  pgm.createTable('password_resets', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    user_id: {
      type: 'uuid',
      notNull: true,
      references: 'users',
      onDelete: 'CASCADE',
    },
    token_hash: { type: 'text', notNull: true },
    expires_at: { type: 'timestamptz', notNull: true },
    used: { type: 'boolean', notNull: true, default: false },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
  });

  // busca rápida pelo hash do token na validação
  pgm.createIndex('password_resets', 'token_hash');
};

exports.down = (pgm) => {
  pgm.dropTable('password_resets');
};