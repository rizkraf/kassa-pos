import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleUser, IdCard, Key, Pizza, Tag } from "lucide-react";

export default function DashboardSetting() {
  const tabs = [
    {
      icon: <CircleUser className="h-5 w-5" />,
      label: "Store",
      description: "Manage your store settings",
      value: "store",
    },
    {
      icon: <IdCard className="h-5 w-5" />,
      label: "Cashier",
      description: "Manage your cashier",
      value: "cashier",
    },
    {
      icon: <Tag className="h-5 w-5" />,
      label: "Category",
      description: "Manage your category",
      value: "category",
    },
    {
      icon: <Pizza className="h-5 w-5" />,
      label: "Menu",
      description: "Manage your menu",
      value: "menu",
    },
    {
      icon: <Key className="h-5 w-5" />,
      label: "Password",
      description: "Change your password",
      value: "password",
    }
  ];

  return (
    <Tabs
      defaultValue="store"
      className="grid h-[calc(100vh-3.55rem)] grid-cols-12 gap-4"
      orientation="vertical"
    >
      <div className="col-span-3 border-r border-border bg-card p-10 h-full">
        <h2 className="text-2xl font-bold mb-6">Setting</h2>
        <TabsList className="grid gap-4 w-full justify-normal bg-transparent">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              className="w-full border border-border justify-normal px-[18px] py-2.5 data-[state=active]:bg-accent data-[state=active]:text-primary data-[state=active]:shadow-none"
              value={tab.value}
            >
              <div className="flex flex-row items-center gap-3">
                {tab.icon}
                <div className="flex flex-col items-start">
                  <p className="text-base font-bold">{tab.label}</p>
                  <p className="text-sm">{tab.description}</p>
                </div>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      <TabsContent className="col-span-9 p-10 m-0" value="store">
        <div>
          <h2 className="text-2xl font-bold mb-6">Store</h2>
        </div>
      </TabsContent>
    </Tabs>
  );
}
