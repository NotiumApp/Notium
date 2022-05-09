import { Dispatch, SetStateAction, useState } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { api } from "../util/api";

interface CreateNoteModalProps {
  parentOpen: boolean;
  toggleModal: () => void;
}

export const CreateNoteModal = ({
  parentOpen,
  toggleModal,
}: CreateNoteModalProps) => {
  return (
    <Modal
      open={parentOpen}
      onClose={() => {
        toggleModal();
      }}
      center
      classNames={{ modal: "rounded-md" }}
    >
      <div className="p-8">
        <h2>Create Note</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            api({
              method: "POST",
            });
            console.log(e.target.name.value);
          }}
        >
          <input name="name" type="text" placeholder="name" />
          <input type="submit" />
        </form>
      </div>
    </Modal>
  );
};
