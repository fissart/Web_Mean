import { Schema, model, Document } from 'mongoose'

const schema = new Schema({
  title: String,
  type: String,
  descriptionnew: String,
  description: String,
  foreign: {
    type: Schema.Types.ObjectId,
  },
  user: {
    type: Schema.Types.ObjectId,
  }
}, {
  timestamps: true,
  collation: { locale: 'es' }
});

export interface IForo extends Document {
  title: string;
  type: string;
  descriptionnew: string,
  description: string,
  foreign: {
    type: Schema.Types.ObjectId,
  },
  user: {
    type: Schema.Types.ObjectId,
  }
}

export default model<IForo>('Foro', schema);
