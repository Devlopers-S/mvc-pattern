import React, { useState, useEffect } from "react";
import axios from "axios";
import PurchaseCourse from "./PurchaseCourse";
import ButtonGroup from "./ButtonGroup";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [purchaseCourses, setPurchaseCourses] = useState([]);
  const [completeCourse, setCompleteCourse] = useState([]);
  const [activeButton, setActiveButton] = useState(0);

  useEffect(() => {
    fetch("http://localhost:4000/course/allCourse")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      fetch(`http://localhost:4000/user/getpurchaseCourses?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          setPurchaseCourses(data); // Assuming `data` is an array of courses
        })
        .catch((error) =>
          console.error("Error fetching purchased courses:", error)
        );
    }
  }, []);

  const handlePurchase = (course) => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      console.error("No user email found in local storage");
      return;
    }
    // Check if the product is already purchased
    if (purchaseCourses.some((p) => p.CourseId === course.CourseId)) {
      alert("course is already purchaed");
      return;
    } else {
      alert("course added");
    }
    axios
      .post("http://localhost:4000/user/purchase", {
        email,
        courseId: course.CourseId,
      })
      .then((res) => {
        console.log("Backend response:", res.data);
        setPurchaseCourses((prev) => [...prev, course]);
      })
      .catch((err) => {
        console.error("Error purchasing product:", err);
      });
  };
  const handleComplete = (course) => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      console.error("No user email found in local storage");
      return;
    }

    axios
      .post("http://localhost:4000/user/completeCourses", {
        email,
        courseId: course.CourseId,
      })
      .then((res) => {
        console.log("Backend response:", res.data);
        alert("Course completed successfully");
      })
      .catch((err) => {
        console.error("Error completing course:", err);
        alert("Failed to complete the course");
      });
  };

  const buttons = [
    { label: "All Courses", status: "all" },
    { label: "Purchased Courses", status: "purchase" },
    { label: "Complete Courses", status: "complete" },
  ];

  return (
    <div className="container mt-3 mx-auto">
      <ButtonGroup
        buttons={buttons}
        activeButton={activeButton}
        onClick={setActiveButton}
      />

      {/* All Products */}
      <div className={`flex-wrap ${activeButton === 0 ? "flex" : "hidden"}`}>
        {courses.length > 0 && (
          <>
            {courses.map((courses, index) => (
              <PurchaseCourse
                course={courses}
                onPurchase={handlePurchase}
                onComplete={handleComplete}
                key={index}
              />
            ))}
          </>
        )}
      </div>

      {/* Purchased Courses */}
      <div className={`flex-wrap ${activeButton === 1 ? "flex" : "hidden"}`}>
        {purchaseCourses.length === 0 ? (
          <p>No purchased courses</p>
        ) : (
          <>
            {purchaseCourses.map((course, index) => (
              <PurchaseCourse course={course} key={index} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AllCourses;
