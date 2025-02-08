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
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/slugify";

const onboardingSchema = z.object({
  name: z.string().min(2),
  address: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
});

export function OnboardingForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      name: "",
      address: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof onboardingSchema>) {
    try {
      const { error, data } = await authClient.organization.create({
        name: values.name,
        slug: slugify(values.name),
        metadata: {
          email: values.email,
          address: values.address,
          phone: values.phone,
        },
      });

      if (error) throw new Error(error.message);

      const { error: errorOrganization } =
        await authClient.organization.setActive({
          organizationId: data.id,
        });

      if (errorOrganization) throw new Error(errorOrganization.message);

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
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
              <FormLabel required>Store Name</FormLabel>
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
              <FormLabel required>Store Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Phone Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Create Store
        </Button>
      </form>
    </Form>
  );
}
