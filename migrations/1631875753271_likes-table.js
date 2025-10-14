 

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('comment_likes', {
    id: {
      type: 'SERIAL',
      primaryKey: true,
    },
    comment_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'comments',
      onDelete: 'cascade',
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'users',
      onDelete: 'cascade',
    },
  });
  pgm.addConstraint('comment_likes', 'comment_likes_unique_per_user', {
    unique: ['comment_id', 'user_id'],
  });
};

exports.down = (pgm) => {
  pgm.dropConstraint('comment_likes', 'comment_likes_unique_per_user');
  pgm.dropTable('comment_likes');
};
