import { Document, model, Model, Schema } from 'mongoose';

interface IUserDetail {
  name: string;
  avatar: string;
  work_mail: string;
  role: [{ Analyst: boolean }, { Trader: boolean }];
  auth_route: string;
  phone: number;
  created_at: string;
  updated_at: string;
  social_id?: string;
}
export type UserDetailDocument = IUserDetail & Document;

const UserDetailSchema: Schema = new Schema({
  name: { type: String, required: false, default: '' },
  avatar: { type: String, required: false, default: '' },
  work_mail: { type: String, required: false, default: '' },
  role: {
    type: [{ Analyst: Boolean }, { Trader: Boolean }],
    required: true,
    default: [{ Analyst: false }, { Trader: true }]
  },
  auth_route: { type: String, required: false, default: '' },
  phone: { type: Number, required: false, default: 0 },
  social_id: { type: String, required: false },
  created_at: { type: Date, required: false, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() }
});

const UserDetail: Model<UserDetailDocument> = model(
  'UserDetail',
  UserDetailSchema
);
export default UserDetail;
