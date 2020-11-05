const database = require('../database');
const Schema = database.Schema;

/**
 * Settings database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */
const SettingsSchema = new Schema(
  {
    theme: { type: String },
    dailyFee: {
      type: DataTypes.DECIMAL(24, 2)
    },
    capacity: {
      type: DataTypes.INTEGER,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true },
);

SettingsSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

SettingsSchema.set('toJSON', {
  getters: true,
});

SettingsSchema.set('toObject', {
  getters: true,
});

const Settings = database.model('settings', SettingsSchema);

module.exports = Settings;
