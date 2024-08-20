import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Registration, RegistrationId } from '~/types/registration.types';
import { getOnlyNumbers } from '~/utils/formatters';
import { isValidCpf } from '~/utils/validators';
import useFetch from '~/hooks/use-fetch';
import useUpdate from '~/hooks/use-update';
import useDelete from '~/hooks/use-delete';
import useToast from '~/hooks/use-toast';
import { useLoaderContext } from '~/hooks/use-loader';

interface DashboardProvider {
  children: React.ReactNode
}
interface DashboardContext {
  registrationsData?: Registration[];
  handleCpfFilter: (cpfValue: string) => void;
  handleRefetch: () => void;
  sendUpdateData: (id: RegistrationId, requestData: Registration) => void;
  sendDeleteData: (id: RegistrationId) => void;
}

const DashboardContext = createContext<DashboardContext | undefined>(undefined);

export const DashboardProvider = ({ children }: DashboardProvider) => {
  const { showLoader, hideLoader } = useLoaderContext();
  const [cpfFilter, setCpfFilter] = useState({ filter: 'cpf', value: '' });
  const { data: registrationsData, error: fetchError, loading: fetchLoading, refetch } = useFetch<Registration[]>('registrations', cpfFilter)
  const { sendUpdateData, responseData: updateResponseData, error: updateError, loading: updateLoading } = useUpdate<Registration>('registrations');
  const { sendDeleteData, responseData: deleteResponseData, error: deleteError, loading: deleteLoading } = useDelete('registrations');
  const { notifySuccess, notifyError } = useToast();

  useEffect(() => {
    if (fetchLoading || updateLoading || deleteLoading) {
      showLoader()
    } else {
      hideLoader()
    }
  }, [fetchLoading, updateLoading, deleteLoading])

  const handleRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleCpfFilter = useCallback((cpfValue: string) => {
    if (!cpfValue || isValidCpf(cpfValue)) {
      const cpfNumbers = getOnlyNumbers(cpfValue);
      if (cpfFilter.value !== cpfNumbers) {
        setCpfFilter({ ...cpfFilter, value: cpfNumbers });
      }
    }
  }, [cpfFilter]);


  useEffect(() => {
    if (registrationsData && !fetchError) {
      notifySuccess('Busca por registros feita com sucesso!');
    }
  }, [registrationsData, fetchError]);

  useEffect(() => {
    if (fetchError && fetchError.message) {
      notifyError(fetchError.message);
    }
  }, [fetchError, notifyError]);

  useEffect(() => {
    if (updateResponseData && !updateError) {
      notifySuccess('Modificação em registro realizada com sucesso!');
    }
  }, [updateResponseData, updateError])

  useEffect(() => {
    if (updateError && updateError.message) {
      notifyError(updateError.message);
    }
  }, [updateError]);

  useEffect(() => {
    if (deleteResponseData && !deleteError) {
      notifySuccess('Remoção de registro realizada com sucesso!');
    }
  }, [deleteResponseData, deleteError])

  useEffect(() => {
    if (deleteError && deleteError.message) {
      notifyError(deleteError.message);
    }
  }, [deleteError]);

  return (
    <DashboardContext.Provider value={{
      registrationsData,
      handleCpfFilter,
      handleRefetch,
      sendUpdateData,
      sendDeleteData
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = (): DashboardContext => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('DashboardProvider faltante');
  }
  return context;
};
