import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";


const Navbar = () => {
  const { data, status } = useSession();

  console.log(data, status);

  return (
    <SessionProvider>
      <div className="navbar flex justify-between">
        <div className="navbar-center">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href={'/'} className="">Home</Link>
              </li>
              <li>
                <Link href={'/movies'} className="">Movies</Link>
              </li>
              <li>
                <a className="">Pricing</a>
              </li>
              <li>
                <a className="">About us</a>
              </li>
            </ul>
          </div>
          <Link href={'/'} className="btn btn-ghost normal-case text-xl">Movies DB</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2">
            <li>
              <Link href={'/'} className="rounded-lg">Home</Link>
            </li>
            <li>
              <Link href={'/movies'} className="rounded-lg">Movies</Link>
            </li>
            <li>
              <a className="rounded-lg">Pricing</a>
            </li>
            <li>
              <a className="rounded-lg">About us</a>
            </li>
          </ul>
        </div>
        {data?.user ? (
          <div className="flex-none gap-3">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">8</span>
                </div>
              </label>
              <div
                tabIndex={0}
                className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
              >
                <div className="card-body">
                  <span className="font-bold text-lg">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <span className="absolute bottom-0 right-0 w-4 h-4 dark:bg-green-600 border rounded-full dark:text-gray-100 dark:border-gray-900"></span>
                <img
                  src={data?.user?.image}
                  alt=""
                  className="border rounded-full dark:bg-gray-500 dark:border-gray-700"
                />
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button onClick={()=> signOut()}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={()=> signIn('github')}
              className="px-4 py-2 text-xs sm:text-lg rounded-md flex justify-center items-center gap-2 dark:bg-yellow-500 dark:text-gray-900"
            >
              Sign in
              <BsGithub size={20} />
            </button>
            <button onClick={()=> signIn('google')} className="px-4 sm:text-lg text-xs flex justify-center items-center gap-2 py-2 rounded-md bg-white text-black">
              Sign in
              <FcGoogle size={20} />
            </button>
          </div>
        )}
      </div>
    </SessionProvider>
  );
};

export default Navbar;
