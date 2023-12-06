import useGame from "../../stores/store";
import "./style.css";

const CustomModal = () => {
  const { setModal } = useGame();

  return (
    <div className="modal" onClick={() => setModal(false)}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-main">
          <div className="modal-text">
            {" "}
            Spin & Win you FREE Sunburn Goa 2023 Ticket
          </div>
          <div className="modal-text text-justify">
            To spin the slot machine and get a FREE Sunburn 2023 ticket, please
            fill out the form below with your name and contact number. This will
            allow us to keep you updated on exciting offers and
            events in the future.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
