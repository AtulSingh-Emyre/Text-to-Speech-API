import {Document, model, Model, Schema} from 'mongoose';

export interface IUserAuthData {
  id: string;
  name: string;
  avatar: string;
  work_mail: string;
  role: any;
  experience: number | undefined;
  phone: number;
  user_groups: any;
  isProfileComplete: boolean;
  business_name: string;
  business_account: boolean;
  website_url: string;
  description: string;
  DOB: Date;
  interests: any;
  isActive: boolean;
}

interface IUserDetail {
  name: string;
  avatar: string;
  work_mail: string;
  roles: any;
  auth_route: string;
  phone: number;
  business_name: string;
  business_account: boolean;
  website_url: string;
  experience: number;
  created_at: string;
  updated_at: string;
  description: string;
  isProfileComplete: boolean;
  user_groups: any;
  DOB: Date;
  interests: any;
  isActive: boolean;
}
export type UserDetailDocument = IUserDetail & Document;

const UserDetailSchema: Schema = new Schema({
  name: {type: String, required: false, default: ''},
  avatar: {type: String, required: false},
  work_mail: {type: String, required: false, default: ''},
  roles: {
    type: Array,
    default: [{Analyst: false}, {Trader: true}],
  },
  auth_route: {type: String, required: false},
  phone: {type: Number, required: false, default: 0},
  isProfileComplete: {type: Boolean, required: true, default: false},
  user_groups: {type: Array, default: []},
  business_name: {type: String, required: false, default: ''},
  business_account: {
    type: Boolean,
    required: false,
    default: false,
  },
  website_url: {type: String, required: false, default: ''},
  description: {type: String, required: false, default: ''},
  experience: {type: Number, required: false, default: 0},
  DOB: {type: Date, required: false, default: new Date()},
  interests: {type: Array, default: []},
  created_at: {type: Date, required: false, default: new Date()},
  updated_at: {type: Date, required: true, default: new Date()},
  isActive: {type: Boolean, required: false, default: false},
});

const UserDetail: Model<UserDetailDocument> = model(
  'UserDetail',
  UserDetailSchema,
);
export default UserDetail;
