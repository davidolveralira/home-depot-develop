import { Form, ProgressBar } from "react-bootstrap";
import "../../assert/styles/login/PasswordSection.scss";

interface PasswordSectionProps {
  password: string;
  passwordValidations: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    specialChar: boolean;
  };
  passwordStrength: string;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordSection: React.FC<PasswordSectionProps> = ({
  password,
  passwordValidations,
  passwordStrength,
  onPasswordChange
}) => {
  return (
    <div className="create-account-input-section mb-4">
      <Form.Group controlId="formPassword">
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={onPasswordChange}
        />
        <Form.Text className="text-muted">
          Create a strong password. Passwords must contain at least 9
          characters.
        </Form.Text>
        <ul className="password-requirements list-unstyled">
          <li
            className={
              passwordValidations.length ? "text-success" : "text-danger"
            }
          >
            ✔️ 9 characters minimum
          </li>
          <li
            className={
              passwordValidations.uppercase ? "text-success" : "text-danger"
            }
          >
            ✔️ Uppercase letter
          </li>
          <li
            className={
              passwordValidations.lowercase ? "text-success" : "text-danger"
            }
          >
            ✔️ Lowercase letter
          </li>
          <li
            className={
              passwordValidations.number ? "text-success" : "text-danger"
            }
          >
            ✔️ Number
          </li>
          <li
            className={
              passwordValidations.specialChar ? "text-success" : "text-danger"
            }
          >
            ✔️ Special character
          </li>
        </ul>

        <ProgressBar
          now={
            passwordStrength === ""
              ? 0
              : passwordStrength === "Poor"
              ? 30
              : passwordStrength === "Medium"
              ? 60
              : 100
          }
          variant={
            passwordStrength === ""
              ? "light"
              : passwordStrength === "Poor"
              ? "danger"
              : passwordStrength === "Medium"
              ? "warning"
              : "success"
          }
        />
      </Form.Group>
    </div>
  );
};

export default PasswordSection;
