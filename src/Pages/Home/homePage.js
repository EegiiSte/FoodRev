import React from "react";

import Home1Intro from "./subHomes/Home1Intro";
import Home2Teamwork from "./subHomes/Home2Teamwork";
import Home3TaskManagement from "./subHomes/Home3Teamwork";
import Home4 from "./subHomes/Home4Scheduling";
import Home5Testimonial from "./subHomes/Home5Testimonial";

function HomePage(props) {
  return (
    <div>
      <Home1Intro user={props.user} />
      <Home2Teamwork />
      <Home3TaskManagement />
      <Home4 />
      <Home5Testimonial user={props.user} />
    </div>
  );
}

export default HomePage;
