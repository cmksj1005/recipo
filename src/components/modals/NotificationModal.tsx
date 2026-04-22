'use client';

import styles from './NotificationModal.module.css';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export default function NotificationModal({
  open,
  onOpenChange,
  titleImage,
  modalTitle,
  description,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void; // functions can be types in TS -> type of a function
  titleImage: React.ReactNode;
  modalTitle: string;
  description: string;
}) {
  return (
    // onOpenChange: when user close the modal, it becomes 'false'
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.dialogContent}>
        <DialogHeader>
          <DialogTitle className={styles.dialogTitle}>
            <div className={styles.titleImage}>{titleImage}</div>
            <div className={styles.modalTitle}>{modalTitle}</div>
          </DialogTitle>
          <DialogDescription
            className={`${styles.dialogDescription} whitespace-pre-line`}
            // whitespace-pre-line is a Tailwind CSS class that makes \n work as line breaks.
          >
            {description}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
