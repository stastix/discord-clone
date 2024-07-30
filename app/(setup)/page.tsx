import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import React from "react";
import { redirect } from "next/navigation";
import InitialModal from "@/components/modals/initial-modal";

const Setup = async () => {
  const profile = await initialProfile();
  if (!profile) return;
  const server = await db.server.findFirst({
    where: {
      Member: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  return (
    <div className="flex h-screen justify-center items-center font-serif  ">
      <InitialModal />
    </div>
  );
};

export default Setup;
