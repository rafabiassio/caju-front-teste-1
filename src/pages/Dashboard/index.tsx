import { Suspense } from "react";
import SearchBar from "./components/Searchbar";
import Collumns from "./components/Columns";
import Loader from "~/components/Loader";
import { DashboardProvider, useDashboardContext } from '~/context/DashboardContext';
import { StyledContainer } from "./styles";

const DashboardPage = () => {
  const {
    registrationsData,
    handleCpfFilter,
    handleRefetch,
  } = useDashboardContext();

  return (
    <Suspense fallback={<Loader />}>
      <StyledContainer>
        <SearchBar handleCpfFilter={handleCpfFilter} refetch={handleRefetch} />
        <Collumns registrations={registrationsData} />
      </StyledContainer>
    </Suspense>
  );
};

const DashboardPageWithProvider = () => (
  <DashboardProvider>
    <DashboardPage />
  </DashboardProvider>
)

export default DashboardPageWithProvider;
