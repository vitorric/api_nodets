import { Schema, Document } from 'mongoose';

import conn from '../connection';
import User from '@domain/entities/User';

type DocumentModel = Document & User;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: Boolean, required: true, default: 1 },
    deleted: { type: Boolean, required: true, default: 0 },
  },
  {
    collection: 'User',
    timestamps: true,
  },
);

const userSchema = conn.model<DocumentModel>('User', UserSchema);

export { userSchema };
