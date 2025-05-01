import mongoose from "mongoose";

const watchEntrySchema = new mongoose.Schema({
	mediaId:    { type: String, required: true },
	mediaType:  { type: String, enum: ['movie','tv'], required: true },
	title:      { type: String, required: true },
	posterPath: { type: String },
	genres:     [String],
	director:   String,
	createdAt:  { type: Date, default: Date.now }
  });

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	watchlist:   [watchEntrySchema],
  	watchHistory:[watchEntrySchema]
},{
	timestamps: true
});



export const User = mongoose.model("User", userSchema);