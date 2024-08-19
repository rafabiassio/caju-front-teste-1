import { useState } from "react";
import Collumns from "./components/Columns";
import * as S from "./styles";
import SearchBar from "./components/Searchbar";
import useFetch from "~/hooks/use-fetch";
import { getOnlyNumbers } from "~/utils/formatters";
import { Registration } from "~/types/registration.types";

const DashboardPage = () => {
  const [cpfFilter, setCpfFilter] = useState({ filter: 'cpf', value: '' })
  const { data: registrationsData, error, loading, refetch } = useFetch<Registration[]>('registrations', cpfFilter)

  const handleRefetch = () => {
    if (!loading) refetch()
  }

  const handleCpfFilter = (cpfValue: string) => {
    const cpfNumbers = getOnlyNumbers(cpfValue)

    if (cpfFilter.value !== cpfNumbers) {
      setCpfFilter({ ...cpfFilter, value: cpfNumbers });
    }
  }

  return (
    <S.Container>
      <SearchBar handleCpfFilter={handleCpfFilter} refetch={handleRefetch} />
      <Collumns registrations={registrationsData} />
    </S.Container>
  );
};

export default DashboardPage;
