import React from 'react';
import { Trash2 } from 'lucide-react';
import { Modal } from '../ui';

export default function DeleteModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  isDeleting = false, 
  title = "Delete Item", 
  itemName = "",
  itemType = "item"
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      titleClassName="text-red-600"
      submitButton="Delete"
      cancelButton="Cancel"
      onSubmit={onConfirm}
      disabled={isDeleting}
      className="max-w-md"
      submitButtonClassName="bg-red-600 hover:bg-red-700"
      submitButtonIcon={<Trash2 size={16} strokeWidth={2.5} />}
    >
      <div className="text-sm text-slate-600">
        <p>
          Are you sure you want to delete the {itemType} {itemName ? <strong className="text-gray-900">{itemName}</strong> : ""}?
        </p>
        <p className="mt-2 text-red-500 font-medium">
          This action cannot be undone.
        </p>
      </div>
    </Modal>
  );
}
