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

const verificationSchema = z.object({
  verification_code: z.string().length(6),
});

export function VerificationForm() {
  const form = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      verification_code: "",
    },
  });

  function onSubmit(values: z.infer<typeof verificationSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="verification_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Verification Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Verify Email
        </Button>
        <div className="flex flex-row items-center justify-center space-x-1">
          <p className="text-sm text-muted-foreground">
            Haven’t received a code yet?
          </p>
          <Button variant="link" className="h-fit p-0 font-bold">
            Resend Code
          </Button>
        </div>
      </form>
    </Form>
  );
}
