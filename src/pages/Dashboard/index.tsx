import Collumns from "./components/Columns";
import * as S from "./styles";
import SearchBar from "./components/Searchbar";
import { useDashboardContext } from '~/context/DashboardContext';

const DashboardPage = () => {
  const {
    registrationsData,
    handleCpfFilter,
    handleRefetch,
  } = useDashboardContext();

  return (
    <S.Container>
      <SearchBar handleCpfFilter={handleCpfFilter} refetch={handleRefetch} />
      <Collumns registrations={registrationsData} />
    </S.Container>
  );
};

export default DashboardPage;
