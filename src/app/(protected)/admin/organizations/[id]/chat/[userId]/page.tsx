import { getUser } from "@/lib/auth/lucia";
import { redirect } from "next/navigation";
import { Roles } from "@prisma/client";
import AdminLayout from "@/components/chat/adminLayout";
import ActiveChatComponent from "@/components/chat/activeChat";
import ConnectedChat from "@/components/chat/connectedChat";
import {
  getOrganizationMessageThreads,
  getUserMessageList,
} from "@/services/actions/messagesActions";

export default async function Page({
  params,
}: {
  params: { id: string; userId: string };
}) {
  const user = await getUser();

  if (!user) {
    redirect("/auth");
  }

  const chats = await getOrganizationMessageThreads(params.id);
  const messages = await getUserMessageList(user.id, params.id);
  console.log(messages);

  // a couple of assumptions must be made here.
  // the sender can be anyone from the org
  // if no destination or user then something went wrong
  if (user.role === Roles.USER) {
    return (
      <main className="flex flex-col items-center justify-center">
        <AdminLayout
          userProps={{
            picture: user.picture!,
            email: user.email,
            name: user.name,
          }}
        >
          <ActiveChatComponent chats={chats}>
            <ConnectedChat
              defaultMessages={messages}
              userId={params.userId}
              orgId={params.id}
            />
          </ActiveChatComponent>
        </AdminLayout>
      </main>
    );
  } else if (user.role === Roles.NEW_USER) {
    redirect("/newuser");
  }
}
