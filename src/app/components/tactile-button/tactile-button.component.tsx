import React from "react";
import {
  StyledButton,
  ButtonOutter,
  ButtonInner,
} from "../../styles/TactileButton.styles";

interface TactileButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const TactileButton: React.FC<TactileButtonProps> = ({ children, onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      <ButtonOutter>
        <ButtonInner>
          <span>{children}</span>
        </ButtonInner>
      </ButtonOutter>
    </StyledButton>
  );
};

export default TactileButton;
