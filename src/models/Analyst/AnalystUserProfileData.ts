import * as mongoose from 'mongoose';

interface IAnalystUserProfile {
  name: string;
  prof_pic: string;
  work_mail: string;
  role: [{ Analyst: boolean }, { Trader: boolean }];
  business_name: string;
  business_account: boolean;
  website_url: string;
  experience: number;
  auth_route: string;
  phone: number;
  description: string;
  created_at: string;
  updated_at: string;
}
export type AnalystUserProfileDocument = IAnalystUserProfile &
  mongoose.Document;

const AnalystUserProfileSchema: mongoose.Schema = new mongoose.Schema({
  name: { type: String, required: false },
  prof_pic: { type: String, required: false },
  work_mail: { type: String, required: false },
  role: {
    type: [{ Analyst: Boolean }, { Trader: Boolean }],
    required: false,
    default: [{ Analyst: false }, { Trader: true }]
  },
  business_name: { type: String, required: false },
  business_account: { type: Boolean, required: false },
  website_url: { type: String, required: false },
  experience: { type: Number, required: false },
  auth_route: { type: String, required: false },
  phone: { type: Number, required: false },
  description: { type: String, required: false },
  created_at: { type: Date, required: false, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() }
});

const AnalystUserProfile: mongoose.Model<AnalystUserProfileDocument> = mongoose.model(
  'AnalystUserProfile',
  AnalystUserProfileSchema
);
export default AnalystUserProfile;
