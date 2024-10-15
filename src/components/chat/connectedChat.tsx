"use client";

import { useState, useEffect, useRef } from "react";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "../ui/textarea";
import {
  Message,
  MessageList,
  MessageThreadTypeEnum,
} from "@/schemas/messagesSchema";
import { sendUserWhatsappMessageAction } from "@/services/actions/messagesActions";

function ChatCard({ message }: { message: Message }) {
  const isCurrentUser = message.senderUser?.id === "You";

  return (
    <div
      className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`flex ${
          isCurrentUser ? "flex-row-reverse" : "flex-row"
        } items-start`}
      >
        <Avatar className="w-8 h-8">
          <AvatarFallback>{message.senderUser?.name}</AvatarFallback>
        </Avatar>
        <div className={`mx-2 ${isCurrentUser ? "text-right" : "text-left"}`}>
          {/* <div className="text-sm text-muted-foreground">{message.sender}</div> */}
          <div
            className={`mt-1 rounded-lg p-2 ${
              isCurrentUser
                ? "bg-primary text-primary-foreground"
                : "bg-secondary"
            }`}
          >
            {message.content}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {/* {new Date(message.timestamp).toLocaleTimeString()} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConnectedChat({
  defaultMessages,
  userId,
  threadIds,
}: {
  defaultMessages: MessageList;
  userId: string;
  threadIds: {
    [MessageThreadTypeEnum.Enum.whatsapp]: string;
    [MessageThreadTypeEnum.Enum.email]: string;
  };
}) {
  const [messages] = useState<MessageList>(defaultMessages);
  const [inputMessage, setInputMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (inputMessage.trim()) {
      // await sendUserEmailMessageAction({
      //   destinationUserId: userId,
      //   threadId: threadIds[MessageThreadTypeEnum.Enum.email],
      //   content: inputMessage,
      // });
      await sendUserWhatsappMessageAction({
        destinationUserId: userId,
        threadId: threadIds[MessageThreadTypeEnum.Enum.whatsapp],
        content: inputMessage,
      });
      setInputMessage("");
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Chat Room</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4" ref={scrollAreaRef}>
          {messages.map((message) => (
            <ChatCard key={message.id} message={message} />
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex w-full gap-2"
        >
          <Textarea
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">Send whatsapp</Button>
          <Button type="submit">Send email</Button>
        </form>
      </CardFooter>
    </>
  );
}
