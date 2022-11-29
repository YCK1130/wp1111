// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ comment.js ]
// * PackageName  [ server ]
// * Synopsis     [ Apis of comment ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Comment from "../models/comment";

exports.GetCommentsByRestaurantId = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.restaurantId;
    console.log(id);
    Comment.find({ restaurantId: id }).exec((err, data) => {
        if (err) {
            res.status(403).send({ message: "error", contents: [] });
        }
        console.log(data);
        res.status(200).send({ message: "success", contents: data });
    });
    /****************************************/
    // TODO Part III-3-a: find all comments to a restaurant

    // NOTE USE THE FOLLOWING FORMAT. Send type should be
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }
};

exports.CreateComment = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const body = req.body;
    const { restaurantId, rating, name, content } = body;
    console.log(restaurantId, rating, name, content);

    await new Comment({
        restaurantId: restaurantId,
        rating: rating,
        name: name,
        content: content,
    }).save();
    Comment.find({ restaurantId: restaurantId }).exec((err, data) => {
        if (err) {
            res.status(403).send({ message: "error", contents: [] });
        }
        console.log(data);
        res.status(200).send({ message: "success", contents: data });
    });
    /****************************************/
    // TODO Part III-3-b: create a new comment to a restaurant
};
