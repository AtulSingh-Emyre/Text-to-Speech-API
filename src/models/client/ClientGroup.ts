import {Document, model, Model, Schema} from 'mongoose';

interface IClientGroupAddEdit {
  groupName: string;
  userList: any;
  analystId: string;
}

export type ClientGroupDocument = IClientGroupAddEdit & Document;

const ClientGroupSchema: Schema = new Schema({
  analystId: {type: String, required: true},
  groupName: {type: String, required: false},
  userList: {type: Array, default: []},
  created_at: {type: Date, required: false, default: new Date()},
  updated_at: {type: Date, required: true, default: new Date()},
});

const ClientGroup: Model<ClientGroupDocument> = model(
  'ClientGroupAddEdit',
  ClientGroupSchema,
);
export default ClientGroup;
