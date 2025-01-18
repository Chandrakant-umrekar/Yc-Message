"use client";

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { ApiResponse } from "@/types/ApiResponse";
import Link from "next/link";
import { useParams } from "next/navigation";
import { messageSchema } from "@/schemas/messageSchema";
import { useToast } from "@/hooks/use-toast";

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const { toast } = useToast();

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch("content");

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        ...data,
        username,
      });

      toast({
        title: response.data.message,
        variant: "default",
      });
      form.reset({ ...form.getValues(), content: "" }); // Resetting the form after sending
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ?? "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container mx-auto my-8 p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg transition-colors duration-200 max-w-4xl border border-gray-200 dark:border-gray-700">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-50">
        Public Profile Link
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                  Send Anonymous Message to{" "}
                  <span className="text-blue-600 dark:text-blue-400">
                    @{username}
                  </span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="resize-none min-h-[150px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-md shadow-sm transition-colors duration-200"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-400" />
              </FormItem>
            )}
          />

          <div className="flex justify-center pt-4">
            {isLoading ? (
              <Button
                disabled
                className="bg-gray-400 dark:bg-gray-600 text-white py-2 px-6 rounded-md transition-colors duration-200"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading || !messageContent}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-2 px-6 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Message
              </Button>
            )}
          </div>
        </form>
      </Form>

      <Separator className="my-8 bg-gray-200 dark:bg-gray-700" />

      <div className="text-center">
        <div className="text-gray-700 dark:text-gray-300 font-medium mb-2">
          Want to receive anonymous messages?
        </div>
        <Link href="/sign-up">
          <Button>Create Your Message Board</Button>
        </Link>
      </div>
    </div>
  );
}
