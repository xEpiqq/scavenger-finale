"use client";
import { Fragment, useState } from "react";

import {
  ArrowPathIcon,
  Bars3Icon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Dialog } from "@headlessui/react";

import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { app } from "../../components/initializeFirebase";

const navigation = [
  { name: "Pricing", href: "/pricing" },
  // { name: 'Features', href: '#' },
  { name: "Blog", href: "/blog" },
];

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-12 w-auto" src="/images/logo/crow.png" alt="" />
          </a>
        </div>

        <div className={`flex lg:hidden absolute right-10 ${mobileMenuOpen ? 'hidden' : ''}`}>
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex items-center justify-end pr-6 lg:pr-0">
          <div></div>
        </div>

        {user ? (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/sheets"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              <button className="px-6 py-1 rounded-md hover:bg-gray-900 hover:text-white duration-150 border border-gray-900">Dashboard <span aria-hidden="true">&rarr;</span></button>
            </Link>
          </div>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/login"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log In<span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        )}
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-12 w-auto"
                src="/images/logo/crow.png"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="hover:bg-gray-50 -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              <div className="py-6">
                {user ? (
                  <Link
                    href="/sheets"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Dashboard <span aria-hidden="true">&rarr;</span>
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="text-sm font-semibold leading-6 text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log In<span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

export default Navbar;
