import {Document, Model, model, Schema} from 'mongoose';

interface clientGroup {
  groupId: string;
}
interface IAnalystPostBuySell {
  analyst: string;
  stockName: string;
  comparator: string;
  price: number;
  buy: boolean;
  T1: number;
  T2: number;
  T3: number;
  SL: number;
  possibility: number;
  description: string;
  isIntraday: boolean;
  isActive: boolean;
  validTill: Date;
  isFree: boolean;
  subscriptionPrice: number;
  subscibeClient: Array<clientGroup>;
  created_at: string;
  updated_at: string;
  like: string[];
  isDeleted: boolean;
  created_by: string;
}

export type AnalystPostBuySellDocument = IAnalystPostBuySell & Document;

const AnalystPostBuySellSchema: Schema = new Schema({
  analyst: {
    type: Schema.Types.ObjectId,
    ref: 'AnalystUserProfile',
    required: true,
  },
  stockName: {type: String, required: true},
  price: {type: Number, required: false},
  buy: {type: Boolean, required: true},
  comparator: {type: String, required: false},
  T1: {
    type: Number,
    required: false,
  },
  T2: {
    type: Number,
    required: false,
  },
  T3: {
    type: Number,
    required: false,
  },
  SL: {type: Number, required: false},
  possibility: {type: Number, required: false, default: 50},
  description: {type: String, required: false},
  isIntraday: {type: Boolean, required: false},
  validTill: {type: Date, required: false},
  isFree: {type: Boolean, required: false},
  subscibeClient: {type: Array, required: false},
  subscriptionPrice: {type: Number},
  isActive: {type: Boolean, default: true},
  created_at: {type: Date, required: false, default: new Date()},
  updated_at: {type: Date, required: true, default: new Date()},
  created_by: {type: String, required: true},
  like: {type: Array, default: []},
});

const AnalystPostBuySell: Model<AnalystPostBuySellDocument> = model(
  'AnalystPostBuySell',
  AnalystPostBuySellSchema,
);

export default AnalystPostBuySell;
