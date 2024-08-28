import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import MainWrapper from "./layouts/MainWrapper";
import PrivateRoute from "./layouts/PrivateRoute";

import Register from "../src/views/auth/Register";
import Login from "../src/views/auth/Login";
import Logout from "./views/auth/Logout";
import ForgotPassword from "./views/auth/ForgotPassword";
import CreateNewPassword from "./views/auth/CreateNewPassword";

import Index from "./views/base/Index";
import CourseDetail from "./views/base/CourseDetail";
import Cart from "./views/base/Cart";
import Checkout from "./views/base/Checkout";
import Success from "./views/base/Success";
import Search from "./views/base/Search";

import StudentDashboard from "./views/student/Dashboard";
import StudentCourses from "./views/student/Courses";
import StudentCourseDetail from "./views/student/CourseDetail";
// import Wishlist from "./views/student/Wishlist";
// import StudentProfile from "./views/student/Profile";
// import StudentChangePassword from "./views/student/ChangePassword";

import { CartContext } from "./views/plugin/Context";
import apiInstance from "./utils/axios";
import CartId from "./views/plugin/CartId";

function App() {
  const [cartCount, setCartCount] = useState(0);
  // const [profile, setProfile] = useState([]);

  useEffect(() => {
    apiInstance.get(`course/cart-list/${CartId()}/`).then((res) => {
      setCartCount(res.data?.length);
    });

    // useAxios()
    //   .get(`user/profile/${UserData()?.user_id}/`)
    //   .then((res) => {
    //     setProfile(res.data);
    //   });
  }, []);

  return (
    <CartContext.Provider value={[cartCount, setCartCount]}>
      <BrowserRouter>
        <MainWrapper>
          <Routes>
            <Route path="/register/" element={<Register />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/logout/" element={<Logout />} />
            <Route path="/forgot-password/" element={<ForgotPassword />} />
            <Route
              path="/create-new-password/"
              element={<CreateNewPassword />}
            />

            {/* Base Routes */}

            <Route path="/" element={<Index />} />
            <Route path="/course-detail/:slug/" element={<CourseDetail />} />
            <Route path="/cart/" element={<Cart />} />
            <Route path="/checkout/:order_oid/" element={<Checkout />} />
            <Route path="/payment-success/:order_oid/" element={<Success />} />
            <Route path="/search/" element={<Search />} />

             {/* Student Routes */}
             <Route
                path="/student/dashboard/"
                element={<StudentDashboard />}
              />
              <Route path="/student/courses/" element={<StudentCourses />} />
              <Route
                path="/student/courses/:enrollment_id/"
                element={<StudentCourseDetail />}
              />
              {/* <Route path="/student/wishlist/" element={<Wishlist />} />
              <Route path="/student/profile/" element={<StudentProfile />} />
              <Route
                path="/student/change-password/"
                element={<StudentChangePassword />}
              /> */}

          </Routes>
        </MainWrapper>
      </BrowserRouter>
    </CartContext.Provider>
  );
}

export default App;
