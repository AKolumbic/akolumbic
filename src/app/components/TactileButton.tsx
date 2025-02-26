import React from "react";
import {
  StyledButton,
  ButtonOutter,
  ButtonInner,
} from "../styles/TactileButton.styles";

interface TactileButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  download?: string | boolean;
  className?: string;
}

const TactileButton: React.FC<TactileButtonProps> = ({
  children,
  onClick,
  href,
  download,
  className,
}) => {
  // If href is provided, render as an anchor tag
  if (href) {
    return (
      <StyledButton
        as="a"
        href={href}
        download={download}
        className={className}
      >
        <ButtonOutter>
          <ButtonInner>
            <span>{children}</span>
          </ButtonInner>
        </ButtonOutter>
      </StyledButton>
    );
  }

  // Otherwise render as a button
  return (
    <StyledButton onClick={onClick} className={className}>
      <ButtonOutter>
        <ButtonInner>
          <span>{children}</span>
        </ButtonInner>
      </ButtonOutter>
    </StyledButton>
  );
};

export default TactileButton;
