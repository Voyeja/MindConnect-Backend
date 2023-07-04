import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
<<<<<<< HEAD
import Post from './postModel';
import User from './registerModel';
=======
import Post from './postModel'; // Import the Post model
import User from './registerModel'; // Import the User model
import Group from './groupModel';
>>>>>>> 4c71aa5329a3c1ef64d499a3106baa2b984f825b

export interface CommentAttributes {
  id: string;
  comment: string;
  like: string[];
  user_id: string;
  post_id: string;
  groupId: string | null;
}

class Comment extends Model<CommentAttributes> implements CommentAttributes {
  id!: string;
  comment!: string;
  like!: string[];
  user_id!: string;
  post_id!: string;
  groupId!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
<<<<<<< HEAD
=======
    like: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
>>>>>>> 4c71aa5329a3c1ef64d499a3106baa2b984f825b
    user_id: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'id',
      },
    },
    post_id: {
      type: DataTypes.UUID,
      references: {
        model: Post,
        key: 'id',
      },
<<<<<<< HEAD
=======
    },
    groupId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Group,
        key: 'id',
      },
>>>>>>> 4c71aa5329a3c1ef64d499a3106baa2b984f825b
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    timestamps: true,
  }
);

Comment.belongsTo(Post, { foreignKey: 'post_id' });
Post.hasMany(Comment, { foreignKey: 'post_id', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Comment, { foreignKey: 'user_id' });

export default Comment;
