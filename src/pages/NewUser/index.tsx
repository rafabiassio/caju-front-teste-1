import { ChangeEvent, Suspense, startTransition, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { HiOutlineArrowLeft } from "react-icons/hi";
import TextField from "~/components/TextField";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import DateField from "~/components/DateField";
import Loader from "~/components/Loader";
import { ROUTES } from "~/router/routes";
import usePost from "~/hooks/use-post";
import useToast from "~/hooks/use-toast";
import { useLoaderContext } from "~/hooks/use-loader";
import { Registration, RegistrationStatus } from "~/types/registration.types";
import { formatCpf, getOnlyNumbers } from "~/utils/formatters";
import { isValidCpf, isValidDate } from "~/utils/validators";
import { StyledForm, StyledContainer, Card } from "./styles";

interface NewUserPageForm {
  employeeName: string;
  email: string;
  cpf: string;
  admissionDate: string;
}

const schema = Yup.object().shape({
  employeeName: Yup.string()
    .required('Nome é obrigatório')
    .matches(/^[^\d][A-Za-z]{1,}(?: [A-Za-z]{1,}){1,}$/, 'Nome completo inválido'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  cpf: Yup.string()
    .required('CPF é obrigatório')
    .test('validate-cpf', 'CPF inválido', value => getOnlyNumbers(value || '').length === 11 && isValidCpf(value || '')),
  admissionDate: Yup.string()
    .required('Data de admissão é obrigatória')
    .test('validate-date', 'Data inválida', isValidDate),
});

const NewUserPage = () => {
  const history = useHistory();
  const { sendPostData, responseData, loading, error } = usePost<Omit<Registration, 'id'>>('registrations');
  const { showLoader, hideLoader } = useLoaderContext();
  const { notifySuccess, notifyError } = useToast();

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<NewUserPageForm>({
    resolver: yupResolver(schema),
  });

  const goToHome = () => {
    startTransition(() => {
      history.push(ROUTES.dashboard);
    });
  };

  const handleChangeCpfValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const formattedCpf = formatCpf(value)

    setValue('cpf', formattedCpf)
  }

  const onSubmit = (data: NewUserPageForm) => {
    const formattedData = {
      ...data,
      cpf: getOnlyNumbers(data.cpf),
      status: RegistrationStatus.REVIEW
    };
    sendPostData(formattedData)
  };

  useEffect(() => {
    if (loading) {
      showLoader()
    } else {
      hideLoader()
    }
  }, [loading])

  useEffect(() => {
    if (responseData && !error) {
      notifySuccess('Registro novo criado com sucesso!');
      goToHome()
    }
  }, [responseData, error])

  useEffect(() => {
    if (error?.message) {
      notifyError(error.message);
    }
  }, [error]);

  return (
    <Suspense fallback={<Loader />}>
      <StyledContainer>
        <Card>
          <IconButton onClick={goToHome} aria-label="back">
            <HiOutlineArrowLeft size={24} />
          </IconButton>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="employeeName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Nome"
                  label="Nome"
                  error={errors.employeeName?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Email"
                  label="Email"
                  type="email"
                  error={errors.email?.message}
                />
              )}
            />
            <Controller
              name="cpf"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="CPF"
                  placeholder="Digite seu CPF"
                  maxLength={14}
                  error={errors.cpf?.message}
                  onChange={handleChangeCpfValue}
                />
              )}
            />
            <Controller
              name="admissionDate"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label="Data de admissão"
                  error={errors.admissionDate?.message}
                  handleChange={(value: string) => setValue('admissionDate', value)}
                />
              )}
            />
            <Button type="submit">Cadastrar</Button>
          </StyledForm>
        </Card>
      </StyledContainer>
    </Suspense>
  );
};

export default NewUserPage;
