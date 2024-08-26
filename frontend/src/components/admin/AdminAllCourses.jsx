import React, { useState, useEffect } from "react";
import axios from "axios";
import ButtonGroup from "../user/ButtonGroup";
import PurchaseCourse from "../user/PurchaseCourse";
import AddCourse from "./AddCourse";

const AdminAllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [purchaseCourses, setPurchaseCourses] = useState([]);
  const [activeButton, setActiveButton] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:4000/course/allCourse")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    if (email) {
      axios
        .get(`http://localhost:4000/course/purchase?email=${email}`)
        .then((res) => setPurchaseCourses(res.data))
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
        CourseId: course.CourseId,
      })
      .then((res) => {
        setPurchaseCourses((prev) => [...prev, course]);
        console.log("Product added successfully");
      })
      .catch((err) => {
        console.error("Error purchasing product:", err);
      });
  };

  const buttons = [
    { label: "All Courses", status: "all" },
    { label: "Add Courses", status: "add" },  
  ];

  return (
    <div className="container mt-3 mx-auto">
      <ButtonGroup
        buttons={buttons}
        activeButton={activeButton}
        onClick={setActiveButton}
      />
      {activeButton === 1 && <AddCourse />}
      {/* All Products */}
      <div className={`flex-wrap ${activeButton === 0 ? "flex" : "hidden"}`}>
        {courses.length === 0 ? <p>No courses</p> : (
          <>
            {courses.map((courses, index) => (
              <PurchaseCourse
            course={courses}  
            onPurchase={handlePurchase}
            key={index}
          />
        ))}
          </>
        )}
      </div>

      {/* Purchased Courses */}
      <div className={`flex-wrap ${activeButton === 1 ? "flex" : "hidden"}`}>
        {purchaseCourses.length === 0 ? <p>No purchased courses</p> : ( 
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

export default AdminAllCourses;
