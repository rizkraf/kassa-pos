"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link as LucideLink } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <div className="flex flex-row">
                <FormMessage />
                <Button
                  variant="link"
                  className="ml-auto h-fit p-0 text-xs font-bold"
                  asChild
                >
                  <Link href="/forgot-password">Forgot password?</Link>
                </Button>
              </div>
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Login
        </Button>
        <Alert className="border-0 bg-accent">
          <LucideLink className="h-4 w-4 text-primary" />
          <AlertDescription className="text-muted-foreground">
            Or sign in with{" "}
            <Button variant="link" className="h-fit p-0">
              one-time link
            </Button>
            . We’ll send you the link to your linked email.
          </AlertDescription>
        </Alert>
        <div className="flex flex-row items-center justify-center space-x-1">
          <p className="text-sm text-muted-foreground">
            Don’t have an account?
          </p>
          <Button variant="link" className="h-fit p-0 font-bold" asChild>
            <Link href="/register">Create Account</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
