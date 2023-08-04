import { timeStamp } from 'console';
import { Schema, model, Document } from 'mongoose'

const schema = new Schema({
  title: String,
  description: String,
  task: String,
  img: String,
  time: String,
  unidad: {
    type: Schema.Types.ObjectId,
  },
  curse: {
    type: Schema.Types.ObjectId,
  },
  user: {
    type: Schema.Types.ObjectId,
  }
});

export interface ITheme extends Document {
  title: string,
  description: string,
  task: string,
  img: string,
  time: string,
  unidad: {
    type: Schema.Types.ObjectId,
  },
  curse: {
    type: Schema.Types.ObjectId,
  },
  user: {
    type: Schema.Types.ObjectId,
  }
}

export default model<ITheme>('Theme', schema);
