import styled from "styled-components";
import { RegistrationStatus } from '~/types/registration.types';

const registrationStatusStyles: {
  [key in RegistrationStatus]: { background: string; title: string };
} = {
  [RegistrationStatus.REVIEW]: {
    background: "#FDF8E9",
    title: "#EFC24D",
  },
  [RegistrationStatus.APPROVED]: {
    background: "#EEEEFD",
    title: "#4242DF",
  },
  [RegistrationStatus.REPROVED]: {
    background: "#FBEDF6",
    title: "#CE2893",
  },
};

export const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;
  justify-content: center;
  margin-top: 24px;
`;

export const StyledColumn = styled.div<{ status: RegistrationStatus }>`
  height: auto;
  background-color: ${({ status }) =>
    registrationStatusStyles[status].background};
  border-radius: 32px;
  min-height: 80vh;
  max-height: 80vh;
`;

export const StyledTitle = styled.h3<{ status: RegistrationStatus }>`
  margin: 0px;
  color: ${({ status }) => registrationStatusStyles[status].title};
  margin: 24px;
`;

export const StyledContent = styled.div`
  overflow: auto;
  max-height: 85%;
`;
