import { Schema, Types, type Document } from 'mongoose';
import { dateFormat } from '../utils/dateFormat.js';

// Interface for Reaction model
interface IReaction extends Document {
 reactionId: Schema.Types.ObjectId,
 reactionBody: string,
 username: string,
 createdAt: Schema.Types.Date
}

// Schema to create Reaction model
const reactionSchema = new Schema<IReaction>(
 {
   reactionId: {
     type: Schema.Types.ObjectId,
     default: () => new Types.ObjectId()
   },
   reactionBody: {
     type: String,
     required: true,
     maxlength: 280
   },
   username: {
     type: String,
     required: true
   },
   createdAt: {
     type: Date,
     default: Date.now,
     get: (timestamp:any) => dateFormat(timestamp)
   }
 },
 {
   toJSON: {
     getters: true
   },
   timestamps: true,
   id: false
 }
);



export default reactionSchema;