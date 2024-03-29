// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from "../models/info";

exports.GetSearch = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const priceFilter = req.query.priceFilter;
    const mealFilter = req.query.mealFilter;
    const typeFilter = req.query.typeFilter;
    const sortBy = req.query.sortBy;
    /****************************************/
    // console.log(priceFilter, mealFilter, typeFilter, sortBy);
    // NOTE Hint:
    // use `db.collection.find({condition}).exec(err, data) {...}`
    // When success,
    //   do `res.status(200).send({ message: 'success', contents: ... })`
    // When fail,
    //   do `res.status(403).send({ message: 'error', contents: ... })`
    const tagFilter =
        mealFilter && typeFilter
            ? mealFilter.concat(typeFilter)
            : typeFilter
            ? typeFilter
            : mealFilter;
    const tagFilterProcess =
        mealFilter && typeFilter
            ? {
                  $in: tagFilter,
              }
            : typeFilter
            ? { $in: typeFilter }
            : mealFilter
            ? { $in: mealFilter }
            : {};
    // console.log(tagFilter);
    // console.log(tagFilterProcess, mealFilter, typeFilter);
    Info.find(
        priceFilter && tagFilter
            ? {
                  $and: [
                      { price: { $in: priceFilter } },
                      { tag: tagFilterProcess },
                  ],
              }
            : priceFilter
            ? { price: { $in: priceFilter } }
            : tagFilter
            ? { tag: tagFilterProcess }
            : {}
    )
        .sort(sortBy === "price" ? { price: 1 } : { distance: 1 })
        .exec((err, data) => {
            if (err) {
                res.status(403).send({ message: "error", contents: err });
            }
            // console.log(data);
            res.status(200).send({ message: "success", contents: data });
        });

    // TODO Part I-3-a: find the information to all restaurants

    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
};

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id;
    /****************************************/
    console.log(id);
    // NOTE USE THE FOLLOWING FORMAT. Send type should be
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }
    Info.findOne({ id: id }).exec((err, data) => {
        if (err) {
            res.status(403).send({ message: "error", contents: [] });
        }
        // console.log(data);
        res.status(200).send({ message: "success", contents: data });
    });
    // TODO Part III-2: find the information to the restaurant with the id that the user requests
};
