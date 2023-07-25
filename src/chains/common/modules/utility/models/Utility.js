const { model, models, Schema, SchemaTypes } = require("mongoose");

const ClaimSchema = Schema({
  total: Number,
  claimed: Number,
});

const OptionSchema = Schema({
  id: Number,
  value: String,
});

const QuestionSchema = Schema({
  type: String,
  question: String,
  options: [OptionSchema],
});

const QnA = Schema({
  question: String,
  answer: String
});

const AnswerSchema = Schema({
  value: [QnA],
  userId: {
    type: String,
    ref: "User",
  },
});

const UtilitySchema = Schema(
  {
    title: {
      type: String,
      required: true,
      unique: false,
    },
    description: {
      type: String,
      required: true,
      unique: false,
    },
    image: {
      type: String,
      required: false,
      unique: false,
    },
    confirmationTitle: {
      type: String,
      required: true,
    },
    confirmationDescription: {
      type: String,
      required: true,
    },
    nftCollectionName: {
      type: String,
      required: true,
      unique: false,
    },
    nftCollectionAddress: {
      type: String,
      required: true,
      unique: false,
    },
    ////////////// Future scope //////////////
    creatorQuestions: [QuestionSchema],
    userAnswers: [AnswerSchema],
    /////////////////////////////
    published: {
      type: Boolean,
      required: true,
      default: false,
    },
    startDate: {
      type: Date,
      required: true,
      unique: false,
    },
    endDate: {
      type: Date,
      required: true,
      unique: false,
    },
    claims: ClaimSchema,
    tags: {
      type: [String],
      required: false,
      unique: false,
      default: [],
    },
    claimLink: {
      type: String,
      required: true,
      unique: false,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { collection: "utilities" },
  { timestamps: true }
);

const Utility = models.Utility || model("Utility", UtilitySchema);

module.exports = Utility;
