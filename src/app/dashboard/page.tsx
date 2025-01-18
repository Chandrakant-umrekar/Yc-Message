"use client";

import MessageCard from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Message, User } from "@/model/User";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw, Link as LinkIcon, Copy } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Dashboard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const { toast } = useToast();

  const handleDeleteMessage = async (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;

  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessages);
    } catch (err) {
      const axiosError = err as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message || "Failed to fetch messages",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(true);
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");
        setMessages(response.data.messages || []);
        if (refresh) {
          toast({
            title: "Refreshed Messages",
            description: "Showing latest messages",
          });
        }
      } catch (err) {
        const axiosError = err as AxiosError<ApiResponse>;
        toast({
          title: "Error",
          description:
            axiosError.response?.data.message || "Failed to fetch messages",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setMessages]
  );

  useEffect(() => {
    if (!session) return;
    fetchMessages();
    fetchAcceptMessage();
  }, [session, setValue, fetchAcceptMessage, fetchMessages]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast({
        title: response.data.message,
        variant: "default",
      });
    } catch (err) {
      const axiosError = err as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message || "Failed to fetch messages",
        variant: "destructive",
      });
    }
  };

  if (!session || !session.user)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin" />
      </div>
    );

  const { username } = session?.user;

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: "Copied to clipboard",
      description: "Profile Url copied to clipboard",
    });
  };

  return (
    <div className="flex justify-center min-h-screen dark:bg-gray-900">
      <div className="w-full max-w-6xl p-4 sm:p-6">
        <div className="bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg shadow-sm p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 dark:text-white">
            User Dashboard
          </h1>

          <div className="space-y-6">
            {/* Profile Link Section */}
            <div className="mb-6">
              <h2 className="text-base sm:text-lg font-semibold mb-3">
                Copy Your Unique Link
              </h2>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center">
                <input
                  type="text"
                  value={profileUrl}
                  disabled
                  className="w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600"
                />
                <Button
                  onClick={copyToClipboard}
                  className="w-full sm:w-auto whitespace-nowrap"
                >
                  <Copy />
                  Copy
                </Button>
              </div>
            </div>

            {/* Message Settings Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
              <div className="flex items-center gap-2">
                <Switch
                  {...register("acceptMessages")}
                  checked={acceptMessages}
                  onCheckedChange={handleSwitchChange}
                  disabled={isSwitchLoading}
                  className="data-[state=checked]:bg-green-400 dark:data-[state=checked]:bg-gray-500] data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-700]:"
                />
                <span>
                  Accept Messages:{" "}
                  <span className="font-bold">
                    {acceptMessages ? "On" : "Off"}
                  </span>
                </span>
              </div>
              <Button
                variant="outline"
                onClick={() => fetchMessages(true)}
                className="w-full sm:w-auto"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCcw className="h-4 w-4" />
                )}
              </Button>
            </div>

            <Separator className="bg-gray-200 dark:bg-gray-600" />

            {/* Messages Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {messages.length > 0 ? (
                messages.map((message) => (
                  <div key={message._id as string}>
                    <MessageCard
                      message={message}
                      onMessageDelete={handleDeleteMessage}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-6">
                  <p className="text-gray-600 dark:text-gray-400">
                    No messages to display.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
