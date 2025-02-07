"use client";

import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { registerSchema } from "./schema";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    const { error, data } = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      router.push("/verification?email=" + values.email);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Full Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
              <FormDescription>
                Password must be contain at least 8 characters with 1 upper case
                letter and 1 number.
              </FormDescription>
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Register
        </Button>
        <div className="flex flex-row items-center justify-center space-x-1">
          <p className="text-sm text-muted-foreground">
            Already have an account?
          </p>
          <Button variant="link" className="h-fit p-0 font-bold" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
