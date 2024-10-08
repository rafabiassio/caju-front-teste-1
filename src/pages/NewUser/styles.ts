import styled from "styled-components";
import { StyledIconButton } from "~/components/Buttons/IconButton";
import Button from "~/components/Buttons";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
`;

export const Card = styled.div`
  border: 2px solid #f0f0f0;
  width: 500px;
  padding: 48px;
  display: flex;
  flex-direction: column;
  gap: 16px;
 
  ${StyledIconButton} {
    margin-bottom: 8px;
    align-items: flex-start;
  }

  ${Button}{
    align-self: flex-end;
  }
`;
