import { timeStamp } from 'console';
import { Schema, model, Document } from 'mongoose'

const schema = new Schema({
  title: String,
  description: String,
  img: String,
  test: String,
  codecurse: String,
  task: String,
  time: String,
  timeex: String,
  conceptual: String,
  procedimental: String,
  actitudinal: String,
  curse: {
    type: Schema.Types.ObjectId,
  },
  user: {
    type: Schema.Types.ObjectId,
  }
});

export interface ISection extends Document {
  title: string,
  description: string,
  img: string,
  test: string,
  codecurse: string,
  task: string,
  time: string,
  timeex: string,
  conceptual: string,
  procedimental: string,
  actitudinal: string,
  curse: {
    type: Schema.Types.ObjectId,
  },
  user: {
    type: Schema.Types.ObjectId,
  }
}

export default model<ISection>('Section', schema);
