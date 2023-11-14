import React from "react";

import HomeImageMeeting from "../../../images/imageMain.jpeg";
function Home2Teamwork() {
  return (
    <div className=" height-100vh d-flex just-c position-rel">
      <div
        className=" d-flex position-rel just-space-between "
        style={{
          backgroundColor: "#F5F6FA",
        }}
      >
        <div
          className="position-abs"
          style={{
            paddingTop: "0",
            width: "465px",
            height: "363px",
            top: "50px",
            left: " 140px",
          }}
        >
          <h1
            style={{
              Font: "Mulish",
              Weight: "800",
              fontSize: "48px",
              lineHeight: "60.24px",
            }}
          >
            Your guide to great food critic reviews
          </h1>
          <p
            style={{
              Font: "Mulish",
              Weight: "600",
              fontSize: "18px",
              lineHeight: "30px",
            }}
          >
            The role of a food critic A food critic’s job is to visit
            restaurants, try the food, and write about the experience. Depending
            on the publication, the reviewer might also provide a rating. The
            purpose of a critic’s reviews is to educate readers about what to
            expect and help them make an informed decision about whether the
            restaurant is right for them. Traditional food critics — those who
            write for reputable newspapers and magazines — are usually trained
            journalists. This formal education helps them apply consistent
            standards and write fairly about each establishment. Many critics
            have years of experience writing about food, restaurants, food
            service, chefs, and industry trends. They’re well-versed in
            different cuisines, cooking styles and service types. Unlike other
            journalists, a restaurant critic needs a few specific, intangible
            skills — namely, a nuanced palette and few (if any) food aversions.
            That way, they can eat and write about a wide range of dishes
            without incorporating personal bias. Because they go incognito at
            restaurants, critics must be able to order and pay for meals without
            attracting attention.
          </p>
          <p
            style={{
              Font: "Mulish",
              Weight: "600",
              fontSize: "18px",
              lineHeight: "30px",
              color: "lightblue",
            }}
          >
            Learn more <p>-</p>
          </p>
        </div>
        <div
          className="position-abs"
          style={{
            top: "30px",
            right: "0",
            paddingTop: "30px",
          }}
        >
          <img src={HomeImageMeeting} height={"400px"} alt={{}} />
        </div>
      </div>
    </div>
  );
}

export default Home2Teamwork;
