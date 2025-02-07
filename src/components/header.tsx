"use client";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown, LogOut } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: activeOrganization } = authClient.useActiveOrganization();

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  }

  console.log(pathname)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="mx-auto w-full">
        <div className="container flex h-14 items-center px-4 lg:px-6 xl:px-8 2xl:px-10">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={100} height={100} />
          </Link>
          <div className="flex flex-1 items-center justify-between gap-11 md:justify-end">
            <nav className="flex items-center gap-8 text-sm xl:gap-11">
              <Link
                className={
                  pathname === "/dashboard"
                    ? "font-bold text-secondary"
                    : "text-foreground"
                }
                href="/dashboard"
              >
                Home
              </Link>
              <Link
                className={
                  pathname === "/dashboard/orders"
                    ? "font-bold text-secondary"
                    : "text-foreground"
                }
                href="/dashboard/orders"
              >
                Orders
              </Link>
              <Link
                className={
                  pathname === "/dashboard/customers"
                    ? "font-bold text-secondary"
                    : "text-foreground"
                }
                href="/dashboard/customers"
              >
                Customers
              </Link>
              <Link
                className={
                  pathname === "/dashboard/setting"
                    ? "font-bold text-secondary"
                    : "text-foreground"
                }
                href="/dashboard/setting"
              >
                Setting
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activeOrganization?.logo ?? undefined} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-fit w-fit">
                    <span className="text-sm font-medium text-foreground">
                      {activeOrganization?.name}
                    </span>
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
