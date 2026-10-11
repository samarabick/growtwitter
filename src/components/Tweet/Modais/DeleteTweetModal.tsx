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
  isDeleting: boolean;
}

export function DeleteTweetModal({
  isDeleteModalOpen,
  closeDeleteModal,
  confirmDeleteModal,
  isDeleting,
}: Props) {
  return (
    <>
      <Dialog
        open={isDeleteModalOpen}
        onClose={() => closeDeleteModal()}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 backdrop-blur-[2px] bg-black/1">
          <DialogPanel className="max-w-lg space-y-4 modal">
            <DialogTitle className="font-bold text-cupid">
              Excluir post?
            </DialogTitle>
            <Description>
              Essa ação não poderá ser desfeita, e o post será removido do seu
              perfil.
            </Description>
            <div className="flex gap-4">
              {isDeleting ? (
                <button
                  disabled={isDeleting}
                  className="btn btn-cancel buttondisabled"
                >
                  Cancelar
                </button>
              ) : (
                <button
                  className="btn btn-cancel"
                  onClick={() => closeDeleteModal()}
                >
                  Cancelar
                </button>
              )}

              {isDeleting ? (
                <button
                  disabled={isDeleting}
                  className="btn btn-cancel buttondisabled"
                >
                  Excluindo
                </button>
              ) : (
                <button
                  className="btn btn-confirm"
                  onClick={() => confirmDeleteModal()}
                >
                  Excluir
                </button>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
