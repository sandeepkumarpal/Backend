import { asyncHandler } from "../utils/asyncHandler.js";
import { Tweet } from "../models/tweet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createTweet = asyncHandler(async (req, res) => {
  // create tweet
  const { owner, content } = req.body;
  if (!owner) {
    throw new ApiError(400, "owner is required");
  }
  if (!content) {
    throw new ApiError(400, "content is required");
  }

  const tweet = await Tweet.create({
    owner,
    content,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, tweet, "tweet has been successfully posted"));
});

const getUserTweets = asyncHandler(async (req, res) => {
  // TODO: get user tweets
  const { userId } = req.params;
  if (!userId) {
    throw new ApiError(400, "userId is missing");
  }


  // const tweets = await Tweet.aggregate([
  //   {
  //     $match: {
  //       owner: userId,
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "tweets",
  //       localField: "_id",
  //       foreignField: "owner",
  //       as: "alltweets",
  //     },
  //   },
  //   {
  //     $project: {
  //       content: 1,
  //       alltweets: 1,
  //     },
  //   },
  // ]);

  const tweets = await Tweet.find({ owner: userId }).select("-owner");

  if (!tweets || tweets.length === 0) {
    return res.status(404).json(new ApiResponse(404, [], "No tweets found for this user"));
  }
  console.log(tweets);
  return res
    .status(200)
    .json(new ApiResponse(200, tweets, "tweets fetched successfully"));
});

const updateTweet = asyncHandler(async (req, res) => {
  //TODO: update tweet
  const { tweetId } = req.params;
  const { content } = req.body;
  if (!tweetId.trim()) {
    throw new ApiError(400, "tweet is is missing");
  }
  const updatedTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    { $set: { content: content } },
    { new: true }
  );
  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedTweet, "tweet has been updated successfully")
    );
});

const deleteTweet = asyncHandler(async (req, res) => {
  //TODO: delete tweet
  const { tweetId } = req.params;
  if (!tweetId.trim()) {
    throw new ApiError(400, "tweet is is missing");
  }

  const deletedTweet = await Tweet.findByIdAndDelete(tweetId);
  if (deletedTweet) {
    return res
      .status(200)
      .json(new ApiResponse(200, "tweet has been deleted successfully"));
  } else {
    throw new ApiError(400, "unable to delete");
  }
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
