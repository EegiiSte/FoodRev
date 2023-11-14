import React, { useState, useEffect } from "react";
import { Rate } from "antd";
import {
  doc,
  updateDoc,
  collection,
  setDoc,
  getDoc,
  getCountFromServer,
} from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "../../../context/UserContext";
import { blogsCollection, database } from "../../../firebase/myFirebase";

// string_var.charAt(0)
function RateAddBlog(props) {
  const { user } = useUserContext();

  // console.log(user);
  const { blogData } = props;
  const [starValue, setStarValue] = useState(blogData?.stars);
  const [starsCount, setStarsCount] = useState(0);

  // console.log("RateaddBlog>blogData", blogData);
  const calcRate = async () => {
    const ratesCollection = collection(
      database,
      `blogs/${blogData.blogId}/rates`
    );
    const snapshot = await getCountFromServer(ratesCollection);
    // console.log("count: ", snapshot.data().count);
    setStarsCount(snapshot.data().count);
  };

  useEffect(() => {
    calcRate();
  }, [props.blogData]);

  const updateStarValue = async (newStarValue) => {
    try {
      const blogRef = doc(blogsCollection, blogData.blogId);

      const ratesCollection = collection(
        database,
        `blogs/${blogData.blogId}/rates`
      );

      const newRateDocRef = doc(ratesCollection, user.uid);
      const rateDocData = await getDoc(newRateDocRef);
      let newStarAvrg = 0;
      let oldStarAvrg_G4 = blogData.stars > 0 ? blogData.stars : 0;
      if (rateDocData.exists()) {
        // odoo bga rate'G4'-((umnu minii darsan-shine darsan)/user count)
        newStarAvrg =
          oldStarAvrg_G4 -
          (rateDocData.data().stars - newStarValue) /
            (starsCount > 0 ? starsCount : 1);
        await updateDoc(blogRef, {
          stars: newStarAvrg,
        });

        await updateDoc(newRateDocRef, {
          stars: newStarValue,
        });
      } else {
        // (G4*5+5)/6
        newStarAvrg =
          (oldStarAvrg_G4 * starsCount + newStarValue) / (starsCount + 1);

        await updateDoc(blogRef, {
          stars: newStarAvrg,
        });

        await setDoc(newRateDocRef, {
          stars: newStarValue,
        });
      }

      // console.log("RateAddBlog > updateStarValue ", blogData.blogId, {
      //   blogData,
      //   starsCount,
      //   oldStarAvrg_G4,
      //   huvaalt: starsCount > 0 ? starsCount : 1,
      //   newStarValue,
      //   uid: user.uid,
      //   rateDocData,
      //   exists: rateDocData.exists(),
      //   newStarAvrg,
      // });

      toast.success("Rate", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      console.error("Update failed: ", err);
    }
  };

  const handleSelectStarRate = async (value) => {
    setStarValue(value);
    updateStarValue(value);
  };

  return (
    <div
      className="d-flex flex-direction-row align-c gap-10 "
      style={{ width: "100%" }}
    >
      <div>{`(${blogData.stars})`}</div>
      <Rate
        allowClear={false}
        // tooltips={desc}
        // onChange={setStarValue}
        onChange={handleSelectStarRate}
        value={starValue}
        defaultValue={blogData.stars}
      />
      <div style={{ fontSize: "12px" }}>
        {starsCount > 0 ? <span>{starsCount} users rated</span> : <span></span>}
      </div>
    </div>
  );
}

export default RateAddBlog;
