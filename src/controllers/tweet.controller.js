import { asyncHandler } from "../utils/asyncHandler.js";
import { Tweet } from "../models/tweet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createTweet = asyncHandler(async(req,res)=>{
    // create tweet
    const {owner,content} = req.body;
    if (!owner) {
        throw new ApiError(400, "owner is required");
      }
      if (!content) {
        throw new ApiError(400, "content is required");
      }

      const tweet = await Tweet.create({
        owner,
        content
      })

      return res.status(200).json(new ApiResponse(200,tweet,"tweet has been successfull"))
})

export {
    createTweet
}