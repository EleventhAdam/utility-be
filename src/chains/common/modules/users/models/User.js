const { model, models, Schema } = require('mongoose');

const UserSchema = Schema(
  {
    // Wallet address
    address: {
      // Primary key of collection, accepts public address
      type: String,
      required: true,
      unique: true,
    },
    userType: {
      // Standard / Premium / ELITE
      type: String,
      required: false,
      unique: false,
    },
    userName: {
      // User provided name
      type: String,
      required: false,
      unique: false,
    },
    userDescription: {
      // User provided description
      type: String,
      required: false,
      unique: false,
    },
    dob: {
      type: Date,
      required: false,
      unique: false,
    },
    gender: {
      type: String,
      required: false,
      unique: false,
    },
    country: {
      type: String,
      required: false,
      unique: false,
    },
    emailId: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
    },
    profilePhoto: {
      type: String,
      required: false,
      unique: false,
    },
    banner: {
      type: String,
      required: false,
      unique: false,
    },
    utilities: {
      created: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Utility',
          required: false,
        },
      ],
      redeemed: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Utility',
          required: false,
        },
      ],
    },
    totalTradeVolume: {
      type: Number,
      required: false,
      unique: false,
      default: 0,
    },
    chainUsed: {
      type: [String],
      required: true,
      unique: false,
    },
    referralDetails: {
      totalReferred: {
        type: Number,
        required: false,
        unique: false,
        default: 0,
      },
      referralEarned: {
        type: Number,
        required: false,
        unique: false,
        default: 0.0,
      },
      referredAddresses: {
        type: [String],
        required: false,
        unique: false,
        default: [],
      },
      referredBy: {
        type: String,
        required: false,
      },
      referredDate: {
        type: Date,
        required: false,
        unique: false,
        default: Date.now,
      },
    },
  },
  { timestamps: true }
);

const User = models.User || model('User', UserSchema);

module.exports = User;
