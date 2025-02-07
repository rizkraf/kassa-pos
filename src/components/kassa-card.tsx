import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface KassaCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageLogo: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function KassaCard({
  children,
  title,
  description,
  imageLogo,
}: KassaCardProps) {
  return (
    <Card className="w-[32rem] border-none bg-transparent shadow-none">
      <CardHeader className="flex flex-row p-0">
        <div className="rounded-b-3xl bg-background py-3 pr-3">
          <Image
            className="h-full"
            width={100}
            height={100}
            src={imageLogo}
            alt={title}
          />
        </div>
        <div className="w-full rounded-t-3xl bg-card px-4 pb-[18px] pt-5 text-center">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="rounded-b-3xl rounded-tl-3xl bg-card p-8">
        {children}
      </CardContent>
    </Card>
  );
}
