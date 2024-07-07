import { gql, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      userError
      token
    }
  }
`;

const Signin = () => {
  const [signin, { data, loading, error }] = useMutation(LOGIN);
  const handleRegister = (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log("data: ", data);

    signin({ variables: data });
  };

  console.log("data", data);

  const [userError, setUserError] = useState(null);

  useEffect(() => {
    if (data && data?.signin?.token) {
      localStorage.setItem("token", data?.signin?.token);
    }

    if (data && data?.signin?.userError) {
      setUserError(data?.signin?.userError);
    }
  }, [loading]);

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <div className="form">
      <form onSubmit={handleRegister}>
        <label htmlFor="">Your Email</label>
        <input name="email" type="email" />
        <label htmlFor="">Your Password</label>
        <input name="password" type="password" />

        <button className="rounded-full p-2 bg-white text-black">Login</button>
      </form>
    </div>
  );
};

export default Signin;
