import styled from "styled-components";
import { RegistrationStatus } from "~/types/registration.types";

const statusColors = {
  [RegistrationStatus.REVIEW]: {
    backgroundColor: "#ff8858",
    color: "#fff",
  },
  [RegistrationStatus.APPROVED]: {
    backgroundColor: "rgb(155, 229, 155)",
    color: "#000",
  },
  [RegistrationStatus.REPROVED]: {
    backgroundColor: "rgb(255, 145, 154)",
    color: "#000",
  },
};

const Button = styled.button`
  outline: none;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 36px;
  padding: 8px 32px;
  background-color: #64a98c;
  cursor: pointer;
  height: 56px;
  color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  font-size: 16px;
  font-weight: 600;
`;

export const ButtonSmall = styled.button<{ status: RegistrationStatus }>`
  font-size: 12px;
  outline: none;
  border-radius: 4px;
  border: none;
  padding: 4px 16px;
  background-color: ${({ status }) => statusColors[status]?.backgroundColor ?? 'none'};
  color: ${({ status }) => statusColors[status]?.color ?? "#000"};
  cursor: pointer;
`;


export default Button;
