"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ReusableDialog } from "@/components/reusable-dialog";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StoreCashierForm } from "./form";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export function StoreCashier() {
  const [open, setOpen] = useState(false);
  const { data: user } = authClient.useActiveMember();

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle className="text-2xl font-bold">Cashier List</CardTitle>
          <CardDescription>Manage your cashier</CardDescription>
        </div>
        {user?.role === "owner" && (
          <ReusableDialog
            open={open}
            onOpenChange={setOpen}
            trigger={<Button>Add Cashier</Button>}
            title="Add new cashier"
            description="Add new cashier to your store"
          >
            <StoreCashierForm setOpen={setOpen} />
          </ReusableDialog>
        )}
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
