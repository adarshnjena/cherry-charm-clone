// Copyright (c) 2023 Michael Kolesidis <michael.kolesidis@gmail.com>
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import useGame from "../../stores/store";
import "./style.css";

const Modal = () => {
  const { setModal } = useGame();

  return (
    <div className="modal" onClick={() => setModal(false)}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-main">
          <div className="modal-text">
            Click on the SPIN button or press SPACE to spin.
          </div>
          <div className="modal-text">
            <img className="modal-image" src="./images/cherry.png" />
            <img className="modal-image" src="./images/cherry.png" />
            <img className="modal-image" src="./images/cherry.png" />
            <span> Pay 50 </span>
            <img className="modal-image" src="./images/coin.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
