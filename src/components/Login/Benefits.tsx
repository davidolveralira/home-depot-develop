import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faGift,
  faBoxOpen,
  faTag,
  faPaintBrush,
  faMobileAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../../assert/styles/login/Benefits.scss";
interface BenefitsProps {
  accountType: "personal" | "business";
}

const Benefits: React.FC<BenefitsProps> = ({ accountType }) => {
  if (accountType === "personal") {
    return (
      <div className="personal-benefits-section mb-4">
        <ul className="list-unstyled text-left">
          <li className="mb-2">
            <FontAwesomeIcon icon={faShoppingCart} /> Enjoy Fast Checkout
          </li>
          <li className="mb-2">
            <FontAwesomeIcon icon={faGift} /> Receive Exclusive Offers
          </li>
          <li className="mb-2">
            <FontAwesomeIcon icon={faBoxOpen} /> Track Your Orders
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="business-benefits-section">
      <ul className="list-unstyled text-left">
        <li className="mb-2">
          <FontAwesomeIcon icon={faShoppingCart} /> Enjoy Fast Checkout
        </li>
        <li className="mb-2">
          <FontAwesomeIcon icon={faGift} /> Receive Exclusive Offers
        </li>
        <li className="mb-2">
          <FontAwesomeIcon icon={faBoxOpen} /> Track Your Orders
        </li>
        <li className="mb-2">
          <FontAwesomeIcon icon={faTag} /> Volume Pricing Program
        </li>
        <li className="mb-2">
          <FontAwesomeIcon icon={faPaintBrush} /> Pro Xtra Paint Rewards
        </li>
        <li className="mb-2">
          <FontAwesomeIcon icon={faMobileAlt} /> Text to Confirm Purchase
          Authorization
        </li>
      </ul>
    </div>
  );
};

export default Benefits;
