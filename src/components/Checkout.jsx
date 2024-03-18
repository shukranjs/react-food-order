import Modal from "./UI/Modal";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import Input from "./UI/Input";
import UserProgressContext from "../store/UserProgressContext";
import Button from "./UI/Button";
import useHttp from "../hooks/useHttp";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  //   body:
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const { data, isLoading: isSending, error, sendRequest } = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }
  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="postal code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="Failed to submit" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
