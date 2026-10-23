import { Description, Dialog, DialogPanel } from "@headlessui/react";
import { NewTweet } from "../NewTweet";

interface Props {
  type: string;
  isNewTweetModalOpen: boolean;
  closeNewTweetModal: () => void;
}

export function NewTweetModal({
  type,
  isNewTweetModalOpen,
  closeNewTweetModal,
}: Props) {
  return (
    <>
      <Dialog
        open={isNewTweetModalOpen}
        onClose={() => closeNewTweetModal()}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 backdrop-blur-[1.5px] bg-black/15">
          <DialogPanel className="relative max-w-3xl max space-y-6 modal">
            <Description>
              {type === "/home" ? (
                <NewTweet onSubmit={closeNewTweetModal} type="/home" />
              ) : (
                <NewTweet onSubmit={closeNewTweetModal} type={type} />
              )}
            </Description>
            {/* Botão de fechar modal  */}
            <div className="flex gap-4">
              <button
                className="text-gray-500 absolute top-3 left-5 text-xl"
                onClick={() => closeNewTweetModal()}
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
