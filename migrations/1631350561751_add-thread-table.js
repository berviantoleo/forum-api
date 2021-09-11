exports.shorthands = 'add-thread-table';

exports.up = (pgm) => {
  pgm.createTable('threads', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    title: {
      type: 'VARCHAR(512)',
      notNull: true,
    },
    body: {
      type: 'TEXT',
      notNull: true,
    },
    date: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    owner_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'users',
      onDelete: 'cascade',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('threads');
};
