import React from "react";
import ReactDOM from "react-dom";

//https://medium.com/tinyso/how-to-create-a-modal-component-in-react-from-basic-to-advanced-a3357a2a716a

const DeleteModal = ({ ...props }) => {
   if (!props.show) return null;

   return ReactDOM.createPortal(
      <div
         className="modal fixed left-0 top-0 right-0 bottom-0
               bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-[999]"
         onClick={props.onClose}
      >
         <div
            className="py-3 flex flex-col gap-2  bg-white w-96 rounded-xl p-4"
            onClick={(e) => e.stopPropagation()}
         >
            <h2 className="text-xl pt-2 font-semibold">Delete Confirm</h2>
            <p>
               Do you want to delete{" "}
               <span className="font-semibold">{props.content}</span>?
            </p>
            <div className="flex gap-5 justify-end mt-4 text-sm">
               <button
                  className="border border-gray-500 text-gray-500  py-2 px-3 rounded-lg hover:bg-gray-500 hover:text-white"
                  onClick={props.onClose}
               >
                  Cancel
               </button>
               <button
                  type="submit"
                  className="bg-primary py-2 px-6 rounded-lg text-white"
                  onClick={props.onDelete}
               >
                  Yes
               </button>
            </div>
         </div>
      </div>,
      document.getElementById("root")
   );
};

export default DeleteModal;
