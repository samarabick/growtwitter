import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface Props {
  isDeleteModalOpen: boolean;
  closeDeleteModal: () => void;
  confirmDeleteModal: () => void;
}

export function DeleteTweetModal({
  isDeleteModalOpen,
  closeDeleteModal,
  confirmDeleteModal,
}: Props) {
  return (
    <>
      <Dialog
        open={isDeleteModalOpen}
        onClose={() => closeDeleteModal()}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 backdrop-blur-[2px] bg-black/1">
          <DialogPanel className="max-w-lg space-y-4 border-2 border-azalea rounded-lg bg-tututu2 p-12 shadow-md">
            <DialogTitle className="font-bold text-cupid">
              Excluir post?
            </DialogTitle>
            <Description>
              Essa ação não poderá ser desfeita, e o post será removido do seu
              perfil.
            </Description>
            <div className="flex gap-4">
              <button
                className="btn border-gray-400 bg-gr"
                onClick={() => closeDeleteModal()}
              >
                Cancelar
              </button>
              <button
                className="btn border-pink-500 text-white bg-pink-500"
                onClick={() => confirmDeleteModal()}
              >
                Excluir
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
