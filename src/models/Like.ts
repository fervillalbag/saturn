import { model, models, Schema } from 'mongoose'

const LikeSchema = new Schema(
  {
    idPost: {
      type: String,
      required: true
    },
    idUser: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default models.Like || model('Like', LikeSchema)
