import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { FaEye } from "react-icons/fa";
import { BsEyeSlashFill } from "react-icons/bs";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleBtnClick = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const { isEmailValid, isPasswordValid } = checkValidData(email, password);

    if (!isEmailValid || !isPasswordValid) {
      setErrorMsg("Invalid Email or Password!");
    }

    setErrorMsg(null);

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          navigate("/browse");
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + " - " + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + " - " + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleShowPassword = (event) => {
    event.stopPropagation();
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <Header />
      <div className="absolute bg-gradient-to-b from-black">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/b2c3e95b-b7b5-4bb7-a883-f4bfc7472fb7/80a8277e-14eb-4192-83f7-45c27cd0652b/US-en-20240805-POP_SIGNUP_TWO_WEEKS-perspective_WEB_99b9a7c9-7791-4a48-b335-09e8ee246500_small.jpg"
          alt="background"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <form
        action=""
        className="w-3/12 absolute py-12 px-14 bg-black bg-opacity-70  my-36 mx-auto right-0 left-0 text-white"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-semibold text-3xl py-4 mb-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              className="p-4 my-4 w-full bg-transparent rounded border border-gray-500"
            />
            <input
              type="number"
              placeholder="Mobile Number"
              className="p-4 my-4 w-full bg-transparent rounded border border-gray-500"
            />
          </>
        )}
        <input
          type="email"
          ref={emailRef}
          placeholder="Email Address"
          className={`p-4 my-4 w-full bg-transparent rounded border border-gray-500 ${
            errorMsg ? "border-red-500" : ""
          }`}
        />
        <div className="w-full my-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            ref={passwordRef}
            placeholder="password"
            className={`p-4 w-full bg-transparent rounded border border-gray-500 pr-10${
              errorMsg ? "border-red-500" : ""
            }`}
          />
          {showPassword ? (
            <BsEyeSlashFill
              className="absolute right-3 top-1/3 cursor-pointer text-xl text-gray-400"
              onClick={handleShowPassword}
            />
          ) : (
            <FaEye
              className="absolute right-3 top-1/3 cursor-pointer text-xl text-gray-400"
              onClick={handleShowPassword}
            />
          )}
        </div>

        <span className="text-red-500">{errorMsg}</span>
        <button
          className="p-2 my-6 bg-red-600 w-full rounded"
          onClick={handleBtnClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <span className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Webflix? Sign Up now."
            : "Existing User? Sign In now."}
        </span>
      </form>
    </div>
  );
};

export default Login;
