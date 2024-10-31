import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { IConfirmDialogProps } from "@/models/ConfirmDialog/type";

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: IConfirmDialogProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] font-inter">
        <DialogHeader>
          <DialogTitle className="font-semibold text-violet-400">
            {title}
          </DialogTitle>
          <DialogDescription className="py-4 font-semibold">
            {message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-violet-400 bg-violet-50 text-violet-400 hover:text-violet-500 hover:bg-violet-100 font-semibold"
          >
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            className="flex-1  bg-violet-400 hover:text-violet-50 hover:bg-violet-500 font-semibold"
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
