import React from "react";

const Modal = (props) => {
   if (!props.show) {
      return null;
   }
   return (
      <div className="modal">
         <div className="modal-content">
            <div className="modal-header">
               <h4 className="modal-title">Employee Details</h4>
            </div>
            <div className="modal-body">
               <form>
                  <label>
                     <div className="smallSpace">
                        <input
                           className="smallSpace"
                           placeholder="Name"
                           type="text"
                           name="name"
                        />
                     </div>
                     <div className="smallSpace">
                        <input
                           className="smallSpace"
                           placeholder="Latitude"
                           type="text"
                           name="location"
                        />
                     </div>
                     <div className="smallSpace">
                        <input
                           className="smallSpace"
                           placeholder="Longitude"
                           type="text"
                           name="location"
                        />
                     </div>
                  </label>
                  <div className="submitButton">
                     <input className="button" type="submit" value="Submit" />
                  </div>
               </form>
               <div className="modal-footer submitButton">
                  <button onClick={props.onClose} className="button">
                     Close
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Modal;
