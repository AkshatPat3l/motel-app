import React from "react";
import { Button, Navbar } from "flowbite-react";
import { logUserOut, reset } from "../redux/users/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
export default function Header() {
  const { user, isSuccess } = useSelector((state) => state.user);
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/log-in");
      dispatch(reset());
    }
  });

  const logOutUser = async () => {
    dispatch(logUserOut());
  };
  return (
    <Navbar className="border-b-2 bg-knights-purple ">
      <Link to="/">
        <img
          src="https://www.knightsinn.com/wp-content/uploads/2024/02/Group.svg"
          alt=""
        />
      </Link>
      <div className="flex gap-2 md:order-2 ">
        <Navbar.Toggle />
      </div>
      
      <>
        {user ? (
            <Navbar.Collapse className=" ml-auto mr-3 ">
              <Navbar.Link
                className=" text-lg text-white hover:underline active:underline hover:bg-knights-purple no-underline decoration-white underline-offset-8"
                as={Link}
                to="/"
              >
                Home
              </Navbar.Link>
              <Navbar.Link
                className="hover:underline hover:bg-knights-purple text-lg text-white "
                as={Link}
                to="/rooms/create"
              >
                Create
              </Navbar.Link>

              <Navbar.Link
                className="hover:underline cursor-pointer hover:bg-knights-purple text-lg text-white "
                as="div"
                onClick={logOutUser}
              >
                Log Out
              </Navbar.Link>
            </Navbar.Collapse>
        ) : (
          <Navbar.Collapse className=" ml-auto mr-3 ">
            <Navbar.Link
              className=" text-lg text-white hover:underline active:underline hover:bg-knights-purple decoration-white underline-offset-8"
              as={Link}
              to="/"
              aria-current="page"
            >
              Home
            </Navbar.Link>
            <Navbar.Link
              className=" text-lg text-white hover:underline active:underline hover:bg-knights-purple decoration-white underline-offset-8"
              aria-current="page"
              as={Link}
              to="/log-in"
            >
              Login
            </Navbar.Link>
            <Navbar.Link
              className=" text-lg text-white hover:underline hover:bg-knights-purple decoration-white underline-offset-8"
              aria-current=""
              as={Link}
              to="/sign-up"
            >
              Sign Up
            </Navbar.Link>
          </Navbar.Collapse>
        )}
      </>
    </Navbar>
  );
}
