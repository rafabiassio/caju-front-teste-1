import styled from "styled-components";

export const StyledIconButton = styled.button`
  cursor: pointer;
  border: 2px solid #64a98c;
  width: fit-content;
  padding: 4px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  svg {
    color: #64a98c;
  }
`;

type IconButtonProps = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

export const IconButton = (props: IconButtonProps) => {
  return (
    <StyledIconButton {...props}>
      {props.children}
    </StyledIconButton>
  );
};
