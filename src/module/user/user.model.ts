import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import config from '../../config';
import bcrypt from 'bcrypt';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the user
 *         name:
 *           type: string
 *           description: Name of the user
 *         email:
 *           type: string
 *           description: User's email address
 *         role:
 *           type: string
 *           description: Role of the user (admin, user, etc.)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *       required:
 *         - name
 *         - email
 */

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: function (value: string) {
          return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
        },
        message: "{VALUE} is not a valid email",
      },
      immutable: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      maxlength: 20,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


userSchema.pre('save', async function(next){
  const user =  this;
  user.password =  await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
  next()
})

userSchema.post('save', function(doc, next){
  doc.password = ''
  next();
})


const User = model<IUser>("User", userSchema);
export default User;
