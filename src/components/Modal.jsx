import { useEffect, useRef } from "react";
import "./Modal.css"

export default function Modal({ isOpen, buttons, children }) {
  const dialogRef = useRef(null);
  const defaultButton = buttons.filter((button) => button.isDefault) !== 1 ? buttons[0] : null;
  // Synchronize the component's open state with the browser DOM API
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      // showModal() opens it as a modal overlay, trapping keyboard focus
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  // Handle native "Escape key" close triggers gracefully
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (event) => {
      event.preventDefault(); // Stop default browser toggle
      if(defaultButton !== null) {
        defaultButton.action(); // Trigger parent state update
      }
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [defaultButton]);

  return (
    <dialog ref={dialogRef} className="my-modal">
      {children}
      {buttons.map((button) =>    <button key={button.caption} className=".modal" onClick={button.action}>{button.caption}</button>)}
    </dialog>
  );
}
