import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const memberRouter = createTRPCRouter({
  getMemberList: protectedProcedure
    .input(
      z.object({
        organizationId: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.member.findMany({
        where: {
          organizationId: {
            equals: input.organizationId,
          },
        },
      });
    }),
});
