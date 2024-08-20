import React from "react";
import { useLocation } from "react-router-dom";

const PurchaseCourse = ({ course, onPurchase }) => {

  const path = useLocation();
  const pathname = path.pathname;
  return (
    <div className="md:w-4/12 sm:w-1/2 w-full px-3 pb-4" key={course.courseId}>
      <div className="bg-gray-200 rounded-md w-full flex flex-col justify-center items-center">
        <h3>{course.name}</h3>
        <p>{course.description}</p>
        <p>{course.price}</p>
        <div className="flex items-center justify-center gap-3">
         
          {pathname === "/user/allCourses" ? (
            <button
              className="bg-gray-400 rounded-md px-3 py-1 my-3"
              onClick={() => onPurchase(course)}
            >
              Purchase
            </button>
          ) : (
            <button className="bg-gray-400 rounded-md px-3 py-1 my-3" onClick={()=> onPurchase(course)}>
            Edit
          </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseCourse;
