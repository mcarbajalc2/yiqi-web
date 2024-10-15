"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sendUserCommunication } from "@/services/actions/messagesActions";
import {
  MessageList,
  MessageThreadType,
  MessageThreadTypeEnum,
} from "@/schemas/messagesSchema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const formSchema = z.object({
  message: z.string().min(1, {
    message: "Message must be at least 1 character.",
  }),
});

export default function ConnectedChat({
  defaultMessages,
  userId,
  orgId,
}: {
  defaultMessages: MessageList;
  userId: string;
  orgId: string;
}) {
  const [messages, setMessages] = useState(defaultMessages);
  const [messageType, setMessageType] = useState<MessageThreadType>(
    defaultMessages.at(0)?.messageThread.type ||
      MessageThreadTypeEnum.Enum.whatsapp
  );
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const newMessage = await sendUserCommunication({
        destinationUserId: userId,
        content: values.message,
        messageType: messageType,
        orgId: orgId,
      });
      setMessages((prev) => [...prev, newMessage]);
      form.reset();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }

  return (
    <div className="flex flex-col h-full w-full">
      <ScrollArea className="flex-grow" ref={scrollAreaRef}>
        {messages.map((message) => (
          <div key={message.id} className="mb-4">
            <p className="font-bold">{message.senderUser?.name || "Unknown"}</p>
            <p>{message.content}</p>
          </div>
        ))}
      </ScrollArea>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Type your message here." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {messageType === MessageThreadTypeEnum.Enum.whatsapp
                    ? "WhatsApp"
                    : "Email"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() =>
                    setMessageType(MessageThreadTypeEnum.Enum.whatsapp)
                  }
                >
                  WhatsApp
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setMessageType(MessageThreadTypeEnum.Enum.email)
                  }
                >
                  Email
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button type="submit">
              Send{" "}
              {messageType === MessageThreadTypeEnum.Enum.whatsapp
                ? "WhatsApp"
                : "Email"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
