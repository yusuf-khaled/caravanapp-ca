import { model, Schema, Types } from 'mongoose';
import {
  FilterAutoMongoKeys,
  SameKeysAs,
  UserSettings,
} from '@caravan/buddy-reading-types';
import { UserSettingsDoc } from '../../typings';

const UserSettingsDefinition: SameKeysAs<FilterAutoMongoKeys<UserSettings>> = {
  userId: { type: Types.ObjectId, required: true },
  email: { type: String },
};

const UserSettingsSchema = new Schema(UserSettingsDefinition, {
  timestamps: true,
});

export default model<UserSettingsDoc>(
  'UserSettings',
  UserSettingsSchema,
  'userSettings'
);