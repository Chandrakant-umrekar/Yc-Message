"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { User } from "next-auth";
import { Button } from "./ui/button";
import Image from "next/image";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  const [menuOpen, setMenuOpen] = useState(false);
  const { setTheme } = useTheme();

  const handleLogout = () => {
    signOut();
  };

  const LogoutButton = ({ className }: { className?: string }) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={`bg-gradient-to-r from-[#ff4500] to-[#ff8c00] hover:from-[#ff8c00] hover:to-[#ff4500] text-white font-semibold transition-all duration-300 transform hover:scale-105 ${className}`}
        >
          Logout
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-800 dark:text-gray-100">
            Are you sure you want to logout?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 dark:text-gray-300">
            You will need to login again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            className="bg-gradient-to-r from-[#ff4500] to-[#ff8c00] hover:from-[#ff8c00] hover:to-[#ff4500] text-white transition-all duration-300"
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return (
    <nav className="border-b-2 border-transparent hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-blue-600 shadow hover:shadow-none">
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm transition-colors duration-300">
        <div className="container mx-auto flex items-center justify-between p-3">
          <div className="flex items-center space-x-2 group">
            <Link href="/" className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#ff4500] to-[#ff8c00] rounded-full opacity-0 group-hover:opacity-20 transition duration-300"></div>
              <Image
                width={55}
                height={55}
                src="/logo.png"
                alt="logo"
                className="rounded-full relative transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              Message
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-200 dark:border-gray-700 hover:border-[#ff4500] dark:hover:border-[#ff8c00] transition-colors duration-300"
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <DropdownMenuItem
                  onClick={() => setTheme("light")}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("dark")}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("system")}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {session ? (
              <>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Welcome,{" "}
                  <span className="bg-gradient-to-r from-[#ff4500] to-[#ff8c00] text-transparent bg-clip-text font-semibold">
                    {user?.username}
                  </span>
                </span>
                <Link
                  href="/dashboard"
                  className="px-3 py-2 bg-gradient-to-r from-[#ff4500] to-[#ff8c00] hover:from-[#ff8c00] hover:to-[#ff4500] text-white font-semibold transition-all duration-300 transform hover:scale-105 rounded-lg"
                >
                  dashboard
                </Link>
                <LogoutButton />
              </>
            ) : (
              <Link href="/sign-in">
                <Button className="bg-gradient-to-r from-[#ff4500] to-[#ff8c00] hover:from-[#ff8c00] hover:to-[#ff4500] text-white font-semibold transition-all duration-300 transform hover:scale-105">
                  Login
                </Button>
              </Link>
            )}
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 p-2 space-y-2 md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                  >
                    <Sun className="h-4 w-4 mr-2" />
                    Theme
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <DropdownMenuItem
                    onClick={() => setTheme("light")}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setTheme("dark")}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setTheme("system")}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block text-center w-full py-2 px-4 rounded-lg text-white font-semibold bg-gradient-to-r from-[#ff4500] to-[#ff8c00] hover:from-[#ff8c00] hover:to-[#ff4500] transition-all duration-300 transform hover:scale-105"
                  >
                    Dashboard
                  </Link>
                  <LogoutButton className="w-full" />
                </>
              ) : (
                <Link href="/sign-in" className="block w-full">
                  <Button className="w-full bg-gradient-to-r from-[#ff4500] to-[#ff8c00] hover:from-[#ff8c00] hover:to-[#ff4500] text-white font-semibold transition-all duration-300">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
