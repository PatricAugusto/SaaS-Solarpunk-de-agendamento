exports.up = (pgm) => {
  pgm.createTable('bookings', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    event_type_id: {
      type: 'uuid',
      notNull: true,
      references: 'event_types',
      onDelete: 'CASCADE',
    },
    host_user_id: {
      type: 'uuid',
      notNull: true,
      references: 'users',
      onDelete: 'CASCADE',
    },
    guest_name: { type: 'varchar(120)', notNull: true },
    guest_email: { type: 'varchar(160)', notNull: true },
    start_time: { type: 'timestamptz', notNull: true },
    end_time: { type: 'timestamptz', notNull: true },
    status: {
      type: 'varchar(20)',
      notNull: true,
      default: 'confirmed', // confirmed | cancelled
    },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
  });

  // índice para acelerar a checagem de conflito por host + intervalo de tempo
  pgm.createIndex('bookings', ['host_user_id', 'start_time', 'end_time']);
};

exports.down = (pgm) => {
  pgm.dropTable('bookings');
};