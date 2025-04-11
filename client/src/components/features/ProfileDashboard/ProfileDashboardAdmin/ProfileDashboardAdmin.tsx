import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllBooks } from "@api/books/getAll";
import { getAllUsers } from "@api/user/get-all";
import { Typography } from "@components/Typography/Typography";

import { BooksTable } from "./BooksTable/BooksTable";
import { UsersTable } from "./UsersTable/UsersTable";

export const ProfileDashboardAdmin = async () => {
  const [users, booksData] = await Promise.all([
    getAllUsers(),
    getAllBooks({ filter: "title", search: "" }),
  ]);
  return (
    <div className="flex flex-col gap-8">
      <Typography variant="h2">Admin dashboard</Typography>
      <Tabs defaultValue="users">
        <TabsList className="flex h-auto w-full p-2">
          <TabsTrigger value="users" className="flex-1">
            Users
          </TabsTrigger>

          <TabsTrigger value="books" className="flex-1">
            Books
          </TabsTrigger>

          <TabsTrigger value="posts" className="flex-1">
            Posts
          </TabsTrigger>

          <TabsTrigger value="events" className="flex-1">
            Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <UsersTable users={users} />
        </TabsContent>

        <TabsContent value="books">
          <BooksTable books={booksData?.books} />
        </TabsContent>

        <TabsContent value="posts">
          <div>posts</div>
        </TabsContent>

        <TabsContent value="events">
          <div>events</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
