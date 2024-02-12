"use server";

import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db";
import { getSelf } from "@/lib/auth-services";

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const self = await getSelf();

    if (!self) {
        throw new Error("Stream not found");
    }
  
    const selfStream = await prisma.stream.findUnique({
      where: {
        userId: self.uid,
      },
    });

    if (!selfStream) {
      throw new Error("Stream not found");
    }

    const validData = {
      thumbnailUrl: values.thumbnailUrl,
      name: values.name,
      isChatEnabled: values.isChatEnable,
      isChatFollowersOnly: values.isChatFollowersOnly,
      isChatDelayed: values.isChatDelayed,
    };

    const stream = await prisma.stream.update({
      where: {
        id: selfStream.id,
      },
      data: {
        ...validData,
      },
    });

    revalidatePath(`/u/${self.username}/chat`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);

    return stream;
  } catch {
    throw new Error("Internal Error");
  };
};