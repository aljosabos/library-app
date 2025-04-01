import Link from "next/link";

import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

export const NavigationMenu = () => {
  return (
    <Menubar className="h-14 justify-end px-6">
      <MenubarMenu>
        <MenubarTrigger className="px-8 uppercase">Home</MenubarTrigger>
      </MenubarMenu>
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
