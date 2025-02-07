"use client";

import { type z } from "zod";
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
import { verificationSchema } from "./schema";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

export function VerificationForm() {
  const params = useSearchParams();
  const email = params.get("email");
  const router = useRouter();

  const form = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      verification_code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof verificationSchema>) {
    const { error, data } = await authClient.emailOtp.verifyEmail({
      email: email!,
      otp: values.verification_code,
    });

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      router.push("/onboarding");
    }
  }

  async function resendOtp() {
    const { error, data } = await authClient.emailOtp.sendVerificationOtp({
      email: email!,
      type: "email-verification",
    });

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      console.log("OTP sent");
    }
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
          <Button
            type="button"
            onClick={resendOtp}
            variant="link"
            className="h-fit p-0 font-bold"
          >
            Resend Code
          </Button>
        </div>
      </form>
    </Form>
  );
}
