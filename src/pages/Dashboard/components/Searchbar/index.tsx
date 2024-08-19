import { ChangeEvent } from "react";
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
import { formatCpf } from "~/utils/formatters";
import { StyledContainer, Actions } from "./styles";

interface SearchBarProps {
  handleCpfFilter: (cpfValue: string) => void;
  refetch: () => void;
}

interface CPFInput {
  cpf: string;
}

const schema = Yup.object().shape({
  cpf: Yup.string()
    .required('CPF é obrigatório')
    .min(14, 'CPF inválido')
    .test('validate-cpf', 'CPF inválido', value => isValidCpf(value || '')),
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
    history.push(ROUTES.newUser);
  };

  const handleChangeCpfValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const formattedCpf = formatCpf(value)
    const shouldValidate = formattedCpf.length === 14

    setValue('cpf', formattedCpf, { shouldValidate })

    if (!shouldValidate) {
      clearErrors()
    }
    if (isValidCpf(formattedCpf)) {
      handleCpfFilter(formattedCpf)
    }
  }

  return (
    <StyledContainer>
      <Controller
        name="cpf"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder="Digite seu CPF"
            maxLength={14}
            error={errors.cpf && errors.cpf.message}
            onChange={handleChangeCpfValue}
          />
        )}
      />
      <Actions>
        <IconButton aria-label="refetch">
          <HiRefresh onClick={refetch} />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </Actions>
    </StyledContainer>
  );
};

export default SearchBar;