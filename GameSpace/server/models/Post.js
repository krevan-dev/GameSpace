import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ['video', 'image'], required: true },
    contentUrl: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    likeIds: [{ type: Schema.Types.ObjectId, ref: 'Profile', required: true }]
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

PostSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})

PostSchema.virtual('likes', {
  localField: 'likeIds',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
