import { Document, Model, model, Schema } from 'mongoose';

interface IAnalystPostBuySell {
  analyst: string;
  stockName: string;
  comparator: number;
  price: number;
  buy: boolean;
  T: [{ T1: number }, { T2: number }, { T3: number }];
  SL: number;
  possibility: number;
  description: string;
  type: Array<string>;
  paid: boolean;
  created_at: string;
  updated_at: string;
  likes: [
    {
      user: string;
    }
  ];
  comments: [
    {
      user: string;
      text: string;
      name: string;
      avatar: string;
      date: string;
    }
  ];
}

export type AnalystPostBuySellDocument = IAnalystPostBuySell & Document;

const AnalystPostBuySellSchema: Schema = new Schema({
  analyst: {
    type: Schema.Types.ObjectId,
    ref: 'AnalystUserProfile',
    required: true
  },
  stockName: { type: String, required: true },
  comparator: { type: Number, required: false },
  price: { type: Number, required: false },
  buy: { type: Boolean, required: true },
  T: {
    type: [{ T1: Number }, { T2: Number }, { T3: Number }],
    required: false
  },
  SL: { type: Number, required: false },
  possibility: { type: Number, required: false },
  description: { type: String, required: false },
  type: { type: Array, required: false },
  paid: { type: Boolean, required: false },
  created_at: { type: Date, required: false, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

const AnalystPostBuySell: Model<AnalystPostBuySellDocument> = model(
  'AnalystPostBuySell',
  AnalystPostBuySellSchema
);

export default AnalystPostBuySell;
