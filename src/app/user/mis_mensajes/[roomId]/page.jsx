// @ts-check
import { Chat } from "@/features/chat";

/** @param {{ params: { roomId: string }}} props */
const MisMensajesRoomPage = ({ params }) => {
  return <Chat roomId={params.roomId} />;
};

export default MisMensajesRoomPage;
