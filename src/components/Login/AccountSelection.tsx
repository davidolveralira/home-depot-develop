import { Card, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBriefcase } from "@fortawesome/free-solid-svg-icons";

interface AccountSelectionProps {
  selectedAccount: "personal" | "business" | null;
  onSelect: (account: "personal" | "business") => void;
}

const AccountSelection: React.FC<AccountSelectionProps> = ({
  selectedAccount,
  onSelect,
}) => {
  return (
    <div className="create-account-selection mb-4">
      <h5>I'm shopping for</h5>
      <Row>
        <Col>
          <Card
            className={`text-center ${
              selectedAccount === "personal" ? "border-primary" : ""
            }`}
            onClick={() => onSelect("personal")}
            style={{ cursor: "pointer" }}
          >
            <Card.Body>
              <FontAwesomeIcon icon={faUser} size="2x" className="mb-2" />
              <h6>Myself</h6>
              <p>(Personal Account)</p>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            className={`text-center ${
              selectedAccount === "business" ? "border-primary" : ""
            }`}
            onClick={() => onSelect("business")}
            style={{ cursor: "pointer" }}
          >
            <Card.Body>
              <FontAwesomeIcon icon={faBriefcase} size="2x" className="mb-2" />
              <h6>My Business</h6>
              <p>(Pro Xtra Account)</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AccountSelection;
