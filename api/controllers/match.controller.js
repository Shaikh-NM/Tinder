import User from "../models/user.model.js";

export async function swipeRight(req, res) {
  try {
    const { likedUserId } = req.params;
    const user = await User.findById(req.user.userId);
    const likedUser = await User.findById(likedUserId);
    if (!likedUser) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    if (!user.likes.includes(likedUserId)) {
      user.likes.push(likedUserId);
      await user.save();

      if (likedUser.matches.includes(user.userId)) {
        user.matches.push(likedUser);
        likedUser.matches.push(user);

        await Promise.all([await user.save(), await likedUser.save()]);
      }
    }

    return res.status(200).json({ success: true, likes: user.likes });
  } catch (error) {
    console.error("error in swipe right controller : ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function swipeLeft(req, res) {
  try {
    const { dislikedUserId } = req.params;
    const user = await User.findById(req.user.userId);
    if (!user.dislikes.includes(dislikedUserId)) {
      user.dislikes.push(dislikedUserId);
      await user.save();
    }

    return res.status(200).json({ success: true, dislikes: user.dislikes });
  } catch (error) {
    console.error("error in swipe left controller : ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function getMatches(req, res) {
  try {
    const user = await User.findById(req.user.userId).populate(
      "matches",
      "name image"
    );

    res.status(200).json({ success: true, matches: user.matches });
  } catch (error) {
    console.error("error in get matches controller : ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function getUserProfiles(req, res) {
  try {
    const currentUser = await User.findById(req.user.userId);

    const users = await User.find({
      $and: [
        { _id: { $ne: currentUser._id } },
        { _id: { $nin: currentUser.likes } },
        { _id: { $nin: currentUser.dislikes } },
        { _id: { $nin: currentUser.matches } },
        {
          gender:
            currentUser.genderPreference === "both"
              ? { $in: ["male", "female"] }
              : currentUser.genderPreference,
        },
        { genderPreference: { $in: [currentUser.gender, "both"] } },
      ],
    });

    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("error in get user profiles controller : ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
