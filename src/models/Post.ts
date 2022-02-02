import { model, models, Schema } from 'mongoose'

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    image: {
      type: String || null,
      default: null
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default models.Post || model('Post', PostSchema)
