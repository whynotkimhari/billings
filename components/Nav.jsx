"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";
import { mainPageHref } from "@utils/navTools";
import { dictionary } from "@utils/global";
import { useLanguage } from "./LanguageContext";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(null);

  const { language, changeLanguage } = useLanguage();
  const handleLanguageChange = () =>
    changeLanguage(language == "vn" ? "en" : "vn");

  useEffect(() => console.log("Language changed:", language), [language]);

  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setupProviders();
  });

  return (
    <nav className="flex-between w-full mb-8 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="public\assets\images\logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Billin'</p>
      </Link>

      {/* Desktop navigation */}
      <div className="lg:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <button onClick={handleLanguageChange} className="black_btn">
              e
            </button>

            <Link href="/fake-view" className="black_btn">
              {dictionary[language].nav_link_1}
            </Link>

            <Link href="/profile" className="black_btn">
              {dictionary[language].nav_link_2}
            </Link>

            <Link href="/create-billing" className="black_btn">
              {dictionary[language].nav_link_3}
            </Link>

            <button
              type="button"
              onClick={() => {
                signOut().then(() => (window.location.href = mainPageHref));
              }}
              className="outline_btn"
            >
              {dictionary[language].nav_button_1}
            </button>

            <Link href="/profile">
              <Image
                src={session.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="user image"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  {dictionary[language].nav_button_2}
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="user image"
              onClick={() => setToggleDropdown((prev) => !prev)}
            ></Image>

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/fake-view"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  {dictionary[language].nav_link_1}
                </Link>

                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  {dictionary[language].nav_link_2}
                </Link>

                <Link
                  href="/create-billing"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  {dictionary[language].nav_link_3}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  {dictionary[language].nav_button_1}
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  {dictionary[language].nav_button_2}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
