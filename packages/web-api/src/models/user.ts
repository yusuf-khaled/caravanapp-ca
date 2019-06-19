import { model, Schema } from 'mongoose';
import {
  User,
  UserDoc,
  FilterAutoMongoKeys,
  SameKeysAs,
} from '@caravan/buddy-reading-types';

const nestedDiscordDefinition: Required<SameKeysAs<User['discord']>> = {
  id: { type: String, required: true, unique: true, index: true },
  username: { type: String, required: true, unique: true, index: true },
  discriminator: { type: String, required: true },
  avatar: { type: String },
  bot: { type: Boolean },
  mfa_enabled: { type: Boolean },
  locale: { type: String },
  verified: { type: Boolean },
  email: { type: String },
  flags: { type: Number },
  premium_type: { type: Number },
};

const definition: SameKeysAs<FilterAutoMongoKeys<User>> = {
  userId: { type: String, required: true },
  bio: { type: String },
  discord: nestedDiscordDefinition,
  name: { type: String },
  photoUrl: { type: String },
  readingSpeed: { type: String },
};

const userSchema = new Schema<UserDoc>(definition, {
  timestamps: true,
});

export default model<UserDoc>('User', userSchema);
