import { Schema, model, type Document } from 'mongoose';
import { dateFormat } from '../utils/dateFormat.js';
import reactionSchema from './Reaction.js'

// Interface for Thought model
interface IThought extends Document {
  thoughtText: string,
  username: string,
  createdAt: Schema.Types.Date,
  reactions: [typeof reactionSchema]
 }

 // Schema to create Thought model
const thoughtSchema = new Schema<IThought>(
 {
   thoughtText: {
     type: String,
     required: true,
     minlength: 1,
     maxlength: 280
   },
   createdAt: {
     type: Date,
     default: Date.now,
     get: (timestamp:any) => dateFormat(timestamp)
   },
   username: {
     type: String,
     required: true
   },
   reactions: [reactionSchema]
 },
 {
   toJSON: {
     getters: true
   },
   timestamps: true,
   id: false
 }
);

// Create a virtual property `reactionCount` that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function() {
 return this.reactions.length;
});

/// Create the Thought model using the thoughtSchema
const Thought = model('Thought', thoughtSchema);

// Export the Thought model
export default Thought;