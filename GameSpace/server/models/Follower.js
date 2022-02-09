import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const FollowerSchema = new Schema(
  {
    // NOTE Follower is who is following user, following is who the user is following.
    followerId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    followingId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

FollowerSchema.virtual('follower', {
  localField: 'followerId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})

FollowerSchema.virtual('following', {
  localField: 'followingId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
