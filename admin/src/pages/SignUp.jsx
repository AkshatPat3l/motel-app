import { Button, Label, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { registerUser, reset } from "../redux/users/userSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/log-in");
      dispatch(reset());
    }
  }, [isSuccess, user, dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <div className=" items-center">
      <form onSubmit={handleSubmit} className="flex flex-col items-center ">
        <h1 className=" text-center font-semibold text-3xl my-7">Sign Up</h1>
        <div className="flex flex-col p-10 gap-2 border-4 rounded-xl  border-knights-purple">
          <Label value="Your name:" />
          <TextInput
            type="text"
            id="name"
            placeholder="Name"
            onChange={handleChange}
          />
          <Label value="Your Email:" />
          <TextInput
            type="email"
            id="email"
            placeholder="name@company.com"
            onChange={handleChange}
          />
          <Label value="Your Password:" />
          <TextInput
            type="password"
            id="password"
            placeholder="********"
            onChange={handleChange}
          />

          <Button type="submit" className=" bg-knights-purple text-white">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
