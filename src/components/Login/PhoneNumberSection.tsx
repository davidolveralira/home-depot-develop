import { Form } from "react-bootstrap";

interface PhoneNumberSectionProps {
  phoneNumber: string;
  phoneError: string | null;
  onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhoneNumberSection: React.FC<PhoneNumberSectionProps> = ({
  phoneNumber,
  phoneError,
  onPhoneNumberChange,
}) => {
  return (
    <div className="create-account-input-section mb-4">
      <h5>My phone number will be</h5>
      <Form.Group controlId="formPhoneNumber">
        <Form.Control
          type="text"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={onPhoneNumberChange}
          isInvalid={!!phoneError}
        />
        <Form.Control.Feedback type="invalid">
          {phoneError}
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          If you ever lose access to your email, you can still access your
          account by providing a phone number.
        </Form.Text>
      </Form.Group>
    </div>
  );
};

export default PhoneNumberSection;
