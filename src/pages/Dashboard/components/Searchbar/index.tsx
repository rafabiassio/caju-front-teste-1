import { ChangeEvent, startTransition } from "react";
import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import { ROUTES } from "~/router/routes";
import { isValidCpf } from "~/utils/validators";
import { formatCpf, getOnlyNumbers } from "~/utils/formatters";
import { StyledContainer, Actions } from "./styles";

interface SearchBarProps {
  handleCpfFilter: (cpfValue: string) => void;
  refetch: () => void;
}

interface CPFInput {
  cpf?: string;
}

const schema = Yup.object().shape({
  cpf: Yup.string()
    .test('validate-cpf', 'CPF inválido', value => !value || (getOnlyNumbers(value || '').length === 11 && isValidCpf(value || ''))),
});

const SearchBar = ({ handleCpfFilter, refetch }: SearchBarProps) => {
  const history = useHistory();
  const { control, setValue, formState: { errors }, clearErrors } = useForm<CPFInput>({
    mode: "onBlur",
    defaultValues: {
      cpf: '',
    },
    resolver: yupResolver(schema),
  });

  const goToNewAdmissionPage = () => {
    startTransition(() => {
      history.push(ROUTES.newUser);
    });
  };

  const handleChangeCpfValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const formattedCpf = formatCpf(value)

    setValue('cpf', formattedCpf)

    handleCpfFilter(formattedCpf)
  }

  return (
    <StyledContainer>
      <Controller
        name="cpf"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder="Digite seu CPF para filtrar"
            maxLength={14}
            error={errors.cpf?.message}
            onChange={handleChangeCpfValue}
          />
        )}
      />
      <Actions>
        <IconButton aria-label="refetch">
          <HiRefresh onClick={refetch} />
        </IconButton>
        <Button onClick={goToNewAdmissionPage}>Nova Admissão</Button>
      </Actions>
    </StyledContainer>
  );
};

export default SearchBar;