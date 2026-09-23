import { Description, Dialog, DialogPanel } from "@headlessui/react";
import type { Tweet } from "../../types";
import { ReplyTweet } from "./ReplyTweet";
import { TweetsFeed } from "./TweetFeed";

interface Props {
  tweet: Tweet;
  userToken: string;
  userId: string;
  isReplyModalOpen: boolean;
  closeReplyModal: () => void;
}
export function ReplyTweetModal({
  tweet,
  userToken,
  userId,
  isReplyModalOpen,
  closeReplyModal,
}: Props) {
  return (
    <>
      <Dialog
        open={isReplyModalOpen}
        onClose={() => closeReplyModal()}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 backdrop-blur-[1.5px] bg-black/15">
          <DialogPanel className="relative max-w-3xl max space-y-6 border-2 border-cupid rounded-lg bg-tutu p-12 shadow-md">
            <Description>
              <div>
                <TweetsFeed
                  tweet={tweet}
                  userToken={userToken}
                  userId={userId}
                />
              </div>
              <div className="my-4">
                <p className="inline">Respondendo a </p>
                <p className="inline text-cupid font-semibold">{`@${tweet.author.username}`}</p>
              </div>
              <div>
                <ReplyTweet tweetId={tweet.id} userToken={userToken} />
              </div>
            </Description>
            {/* Botão de fechar modal  */}
            <div className="flex gap-4">
              <button
                className="text-gray-500 absolute top-3 left-5 text-xl"
                onClick={() => closeReplyModal()}
              >
                x
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
