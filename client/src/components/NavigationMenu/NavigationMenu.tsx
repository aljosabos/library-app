"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { logoutUser } from "@/api/auth/logout";
import { ICurrentUserResponse } from "@/api/user/get-current";
import { revalidate } from "@/app/actions/route/revalidate";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

interface INavigationMenuProps {
  currentUser: ICurrentUserResponse | undefined;
}

export const NavigationMenu = ({ currentUser }: INavigationMenuProps) => {
  const router = useRouter();

  console.log(currentUser);

  const handleLogout = async () => {
    const response = await logoutUser();

    if (response.success) {
      revalidate("/");
      router.push("/");
    }
  };

  return (
    <Menubar className="h-14 justify-end px-6">
      <MenubarMenu>
        <MenubarTrigger className="px-8 uppercase">
          <Link href="/" className="text-inherit no-underline">
            Home
          </Link>
        </MenubarTrigger>
      </MenubarMenu>

      {currentUser && (
        <MenubarMenu>
          <MenubarTrigger className="px-8 uppercase">
            <Link href="/profile" className="text-inherit no-underline">
              Profile
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
      )}
      <MenubarMenu>
        <MenubarTrigger className="px-8 uppercase">About</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="px-8 uppercase">
          <Link href="/search" className="text-inherit no-underline">
            Search Book
          </Link>
        </MenubarTrigger>
      </MenubarMenu>

      <MenubarMenu>
        {currentUser ? (
          <MenubarTrigger onClick={handleLogout} className="px-8 uppercase">
            Logout
          </MenubarTrigger>
        ) : (
          <MenubarTrigger className="px-8 uppercase">
            <Link href="/login" className="text-inherit no-underline">
              Login
            </Link>
          </MenubarTrigger>
        )}
      </MenubarMenu>
    </Menubar>
  );
};
