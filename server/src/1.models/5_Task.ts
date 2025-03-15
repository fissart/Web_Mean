import { timeStamp } from 'console';
import { Schema, model, Document } from 'mongoose'

const schema = new Schema({
  note: String,
  img: String,
  codigo: String,
  ciclo: String,
  mencion: String,
  teacher: String,
  year: String,
  task: String,
  dateb: String,
  datee: String,
  solution: String,
  asistence: String,
  theme: {
    type: Schema.Types.ObjectId,
  },
  unidad: {
    type: Schema.Types.ObjectId,
  },
  curse: {
    type: Schema.Types.ObjectId,
  },
  user: {
    type: Schema.Types.ObjectId,
  }
}, {
  timestamps: true
});

export interface ITask extends Document {
  note: string,
  img: string,
  codigo: string,
  ciclo: string,
  mencion: string,
  teacher: string,
  year: string,
  task: string,
  dateb: string,
  datee: string,
  solution: string,
  asistence: string,
  theme: {
    type: Schema.Types.ObjectId,
  },
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

export default model<ITask>('Task', schema);
