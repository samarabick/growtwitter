import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface Props {
  isUnfollowModalOpen: boolean;
  closeUnfollowModal: () => void;
  confirmUnfollowModal: () => void;
  profileUsername: string;
}

export function UnfollowModal({
  isUnfollowModalOpen,
  closeUnfollowModal,
  confirmUnfollowModal,
  profileUsername,
}: Props) {
  return (
    <>
      <Dialog
        open={isUnfollowModalOpen}
        onClose={() => closeUnfollowModal()}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 backdrop-blur-[2px] bg-black/1">
          <DialogPanel className="max-w-lg space-y-4 border-2 border-azalea rounded-lg bg-tututu2 p-12 shadow-md">
            <DialogTitle>
              <p>
                Deixar de seguir
                <span className="font-semibold"> @{profileUsername}?</span>
              </p>
            </DialogTitle>
            <Description>
              <p>Os posts dessa pessoa não aparecerão mais na sua timeline.</p>
            </Description>
            <div className="flex gap-4">
              <button
                className="btn border-gray-400 bg-gr"
                onClick={() => closeUnfollowModal()}
              >
                Cancelar
              </button>
              <button
                className="btn border-pink-500 text-white bg-pink-500"
                onClick={() => confirmUnfollowModal()}
              >
                Deixar de Seguir
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
