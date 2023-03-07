import * as React from "react";
import PropTypes from "prop-types";
import styles from "./button.module.css";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<Props> = React.memo(({ children, onClick }) => (
  <button className={styles.button} onClick={onClick}>
    {children}
  </button>
));

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default Button;
