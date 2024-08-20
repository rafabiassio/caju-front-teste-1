import { StyledColumn, StyledContainer, StyledContent, StyledTitle } from "./styles";
import { Registration, RegistrationStatus } from "~/types/registration.types";
import RegistrationCard from "../RegistrationCard";

type CollumnsProps = {
  registrations?: Registration[];
};

const COLUMNS = [
  { status: RegistrationStatus.REVIEW, title: "Pronto para revisar" },
  { status: RegistrationStatus.APPROVED, title: "Aprovado" },
  { status: RegistrationStatus.REPROVED, title: "Reprovado" },
];

const Collumns = ({ registrations = [] }: CollumnsProps) => {

  return (
    <StyledContainer>
      {COLUMNS.map((collum) => {
        return (
          <StyledColumn status={collum.status} key={collum.title}>
            <>
              <StyledTitle status={collum.status}>
                {collum.title}
              </StyledTitle>
              <StyledContent>
                {registrations
                  .filter(registration => registration.status === collum.status)
                  .map((registration) => {
                    return (
                      <RegistrationCard
                        data={registration}
                        key={registration.id}
                      />
                    );
                  })}
              </StyledContent>
            </>
          </StyledColumn>
        );
      })}
    </StyledContainer>
  );
};
export default Collumns;
