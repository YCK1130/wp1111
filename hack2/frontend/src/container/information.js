/****************************************************************************
  FileName      [ information.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the information of restaurant ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React from "react";
import Stars from "../components/stars";
import "../css/restaurantPage.css";

const Information = ({ info, rating }) => {
    const getTag = (tags) => {
        return (
            <>
                {/* TODO Part III-2-a render tags */}

                {tags.map((tag) => {
                    return (
                        <div className="tag" key={tag}>
                            {tag}
                        </div>
                    );
                })}
            </>
        );
    };
    const getPriceTag = (price) => {
        let priceText = "";
        for (let i = 0; i < price; i++) priceText += "$";
        return (
            <div className="tag" key="price">
                {/* TODO Part III-2-a render price tags; hint: convert price number to dollar signs first */}
                {priceText}
            </div>
        );
    };

    const getBusiness = (time) => {
        return (
            <div className="businessTime">
                {/* TODO Part III-2-c: render business time for each day*/}
                <div className="singleDay">
                    <div className="day">Mon</div>
                    <div className="time">
                        {time.All || time.Mon || "Closed"}
                    </div>
                </div>
                <div className="singleDay">
                    <div className="day">Tue</div>
                    {time.All || time.Tue || "Closed"}
                    <div className="time"></div>
                </div>
                <div className="singleDay">
                    <div className="day">Wed</div>
                    {time.All || time.Wed || "Closed"}
                    <div className="time"></div>
                </div>
                <div className="singleDay">
                    <div className="day">Thr</div>
                    {time.All || time.Thr || "Closed"}
                    <div className="time"></div>
                </div>
                <div className="singleDay">
                    <div className="day">Fri</div>
                    {time.All || time.Fri || "Closed"}
                    <div className="time"></div>
                </div>
                <div className="singleDay">
                    <div className="day">Sat</div>
                    {time.All || time.Sat || "Closed"}
                    <div className="time"></div>
                </div>
                <div className="singleDay">
                    <div className="day">Sun</div>
                    {time.All || time.Sun || "Closed"}
                    <div className="time"></div>
                </div>
            </div>
        );
    };

    return (
        <div className="infoContainer">
            <h2>{info.name}</h2>
            <div className="infoRow">
                <div className="rate">
                    {rating === 0 ? (
                        <p>No Rating</p>
                    ) : (
                        <Stars rating={rating} displayScore={true} />
                    )}
                </div>
                <div className="distance">{info.distance / 1000} km</div>
            </div>
            <div className="infoRow">
                {getPriceTag(info.price)}
                {getTag(info.tag)}
            </div>
            <h5>Business hours:</h5>
            {getBusiness(info.time)}
        </div>
    );
};
export default Information;
