import Link from "next/link";

import { ICurrentUserResponse } from "@/api/user/get-current";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

interface INavigationMenuProps {
  currentUser?: ICurrentUserResponse | null;
}

export const NavigationMenu = ({ currentUser }: INavigationMenuProps) => {
  return (
    <Menubar className="h-14 justify-end px-6">
      <MenubarMenu>
        <MenubarTrigger className="px-8 uppercase">Home</MenubarTrigger>
      </MenubarMenu>

      {currentUser && (
        <MenubarMenu>
          <MenubarTrigger className="px-8 uppercase">
            <Link
              href={currentUser?.isAdmin ? "/profile/admin" : "/profile/user"}
              className="text-inherit no-underline"
            >
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
        <MenubarTrigger className="px-8 uppercase">Login</MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};
