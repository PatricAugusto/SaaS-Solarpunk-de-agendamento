exports.up = (pgm) => {
  pgm.createTable('event_types', {
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
    title: { type: 'varchar(120)', notNull: true },
    slug: { type: 'varchar(120)', notNull: true }, // ex: "call-30min"
    description: { type: 'text' },
    duration_minutes: { type: 'integer', notNull: true, default: 30 },
    color: { type: 'varchar(20)', default: '#39FF88' }, // acento neon padrão
    is_active: { type: 'boolean', notNull: true, default: true },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
  });

  // slug único por usuário (dois usuários podem ter o mesmo slug, mas não repetir pro mesmo user)
  pgm.addConstraint('event_types', 'unique_user_slug', {
    unique: ['user_id', 'slug'],
  });
};

exports.down = (pgm) => {
  pgm.dropTable('event_types');
};