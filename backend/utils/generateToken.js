import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET);

	res.cookie("jasonwebtoken-mover", token, {
		//secure: ENV_VARS.NODE_ENV !== "development",
	});

	return token;
};