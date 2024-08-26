import React from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const PurchaseCourse = ({ course, onPurchase, onComplete }) => {
  const handleDelete = async () => {
    await axios
      .delete("http://localhost:4000/admin/DeleteCourse", {
        data: { CourseId: course.CourseId },
      })
      .then(() => {
        window.location.reload();
      });
  };

  const path = useLocation();
  const pathname = path.pathname;
  return (
    <div className="md:w-4/12 sm:w-1/2 w-full px-3 pb-4" key={course.CourseId}>
      <div className="bg-gray-200 rounded-md w-full flex flex-col justify-center items-center">
        <h3>{course.name}</h3>
        <p>{course.description}</p>
        <p>{course.price}</p>
        <div className="flex items-center justify-center gap-3">
          {pathname === "/user/allCourses" ? (
            <>
              <button
                className="bg-gray-400 rounded-md px-3 py-1 my-3"
                onClick={() => onPurchase(course)}
              >
                Purchase
              </button>
              <button
                className="bg-gray-400 rounded-md px-3 py-1 my-3"
                onClick={() => onComplete(course)}
              >
                Complete
              </button>
            </>
          ) : (
            <>
              <Link
                className="bg-gray-400 rounded-md px-3 py-1 my-3"
                to={`/admin/updateCourse/${course.CourseId}`}
              >
                Edit
              </Link>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-md"
                onClick={handleDelete}
              >
                delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseCourse;
