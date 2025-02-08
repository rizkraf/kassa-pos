"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { slugify } from "@/lib/slugify";
import { useMemo } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const storeSchema = z.object({
  name: z.string().min(2),
  address: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
});

type OrganizationMetadata = {
  address?: string;
  email?: string;
  phone?: string;
};

type ActiveOrganization = {
  id: string;
  name?: string;
  logo?: string;
  metadata?: string;
};

export function StoreSetting() {
  const { toast } = useToast();
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const organization = useMemo(
    () => activeOrganization as ActiveOrganization,
    [activeOrganization],
  );
  const defaultMetadata = organization?.metadata
    ? (JSON.parse(organization.metadata) as OrganizationMetadata)
    : {};

  const form = useForm<z.infer<typeof storeSchema>>({
    resolver: zodResolver(storeSchema),
    values: {
      name: organization?.name ?? "",
      address: defaultMetadata.address ?? "",
      email: defaultMetadata.email ?? "",
      phone: defaultMetadata.phone ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof storeSchema>) {
    try {
      const { error } = await authClient.organization.update({
        data: {
          name: values.name,
          slug: slugify(values.name),
          metadata: {
            email: values.email,
            address: values.address,
            phone: values.phone,
          },
        },
        organizationId: organization?.id ?? "",
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Store updated successfully",
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="mb-6 text-2xl font-bold">Store</h2>
      <div className="flex flex-row items-center space-x-7">
        <Avatar className="h-20 w-20">
          <AvatarImage src={organization?.logo ?? undefined} />
          <AvatarFallback className="bg-card">K</AvatarFallback>
        </Avatar>
        <div className="flex flex-row space-x-4">
          <Button asChild className="cursor-pointer">
            <Label htmlFor="upload-image">Change Profile</Label>
          </Button>
          <Button variant="destructiveOutline">Delete</Button>
          <Input
            id="upload-image"
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
          />
        </div>
      </div>
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
          <div className="grid grid-cols-2 gap-4">
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
          </div>
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
          <p className="text-sm text-muted-foreground">
            This store was created on{" "}
            {activeOrganization?.createdAt.toDateString()}
          </p>
          <div className="flex justify-end space-x-4">
            <Button variant="outline" type="button" asChild>
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
