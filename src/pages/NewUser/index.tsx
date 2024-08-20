import { Suspense } from "react";
import { useHistory } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import TextField from "~/components/TextField";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import Loader from "~/components/Loader";
import { ROUTES } from "~/router/routes";
import { StyledContainer, Card } from "./styles";

const NewUserPage = () => {
  const history = useHistory();

  const goToHome = () => {
    history.push(ROUTES.dashboard);
  };

  return (
    <Suspense fallback={<Loader />}>
      <StyledContainer>
        <Card>
          <IconButton onClick={goToHome} aria-label="back">
            <HiOutlineArrowLeft size={24} />
          </IconButton>
          <TextField placeholder="Nome" label="Nome" />
          <TextField placeholder="Email" label="Email" type="email" />
          <TextField placeholder="CPF" label="CPF" />
          <TextField label="Data de admissão" type="date" />
          <Button onClick={() => { }}>Cadastrar</Button>
        </Card>
      </StyledContainer>
    </Suspense>
  );
};

export default NewUserPage;
