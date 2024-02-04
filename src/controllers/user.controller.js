import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { uploadFileOnCloudinayry } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;
  console.log(email);

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "all fields are required");
  }

  const existedUser = User.findOne({
    $or: [{ email }, { username }],
  });
  if (existedUser) {
    throw new ApiError(409, "user with email or username is already exists");
  }

  console.log(req.files, "files");

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar field is required");
  }
  const avatar = await uploadFileOnCloudinayry(avatarLocalPath);
  const coverImage = await uploadFileOnCloudinayry(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "error in uploading avatar");
  }

  User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  // res.status(200).json({
  //   message: "RESPONSE AAA GYA BHAI",
  // });
});

export { registerUser };
