import { getStreamByUserId } from "@/lib/stream-services";

import { ToggleCard } from "./_components/toggle-card";
import { getSelf } from "@/lib/auth-services";

const ChatPage = async () => {
    const self = await getSelf();

    if (!self) return null


    const stream = await getStreamByUserId(self.uid);
    if (!stream) {
        throw new Error("Stream not found");
    }

    return (
        <div className="p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">
                    Chat settings
                </h1>
            </div>
            <div className="space-y-4">
                <ToggleCard
                    field="isChatEnabled"
                    label="Enable chat"
                    value={stream.isChatEnable}
                />
                <ToggleCard
                    field="isChatDelayed"
                    label="Delay chat"
                    value={stream.isChatDelayed}
                />
                <ToggleCard
                    field="isChatFollowersOnly"
                    label="Must be following to chat"
                    value={stream.isChatFollowersOnly}
                />
            </div>
        </div>
    );
};

export default ChatPage;