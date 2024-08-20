import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { ButtonSmall } from "~/components/Buttons";
import { Registration, RegistrationStatus } from "~/types/registration.types";
import { useDashboardContext } from "~/context/DashboardContext";
import { Actions, Badge, StyledCard } from "./styles";

type RegistrationCardProps = {
  data: Registration;
};

type RegistrationCardActionsProps = {
  status: RegistrationStatus;
  updateStatus: (newStatus: RegistrationStatus) => void;
};

const RegistrationCardActions = ({ status, updateStatus }: RegistrationCardActionsProps) => {

  const handleUpdateStatus = (newStatusType: RegistrationStatus) => {
    updateStatus(newStatusType)
  }

  if (status === RegistrationStatus.REVIEW) {
    return (
      <>
        <ButtonSmall
          status={RegistrationStatus.REPROVED}
          onClick={() => handleUpdateStatus(RegistrationStatus.REPROVED)}>
          Reprovar
        </ButtonSmall>
        <ButtonSmall
          status={RegistrationStatus.APPROVED}
          onClick={() => handleUpdateStatus(RegistrationStatus.APPROVED)}>
          Aprovar
        </ButtonSmall>
      </>
    )
  }

  return (
    <ButtonSmall
      status={RegistrationStatus.REVIEW}
      onClick={() => handleUpdateStatus(RegistrationStatus.REVIEW)}>
      Revisar novamente
    </ButtonSmall>
  )
}

const RegistrationCard = ({ data }: RegistrationCardProps) => {
  const {
    sendUpdateData,
    sendDeleteData
  } = useDashboardContext();

  const handleUpdate = (newStatus: RegistrationStatus) => {
    const newData = { ...data, status: newStatus }
    sendUpdateData(data.id, newData)
  }

  const handleDelete = () => {
    sendDeleteData(data.id)
  }

  return (
    <StyledCard>
      <Badge>
        <HiOutlineUser />
        <h3>{data.employeeName}</h3>
      </Badge>
      <Badge>
        <HiOutlineMail />
        <p>{data.email}</p>
      </Badge>
      <Badge>
        <HiOutlineCalendar />
        <span>{data.admissionDate}</span>
      </Badge>
      <Actions>
        <RegistrationCardActions status={data.status} updateStatus={handleUpdate} />
        <HiOutlineTrash onClick={handleDelete} />
      </Actions>
    </StyledCard>
  );
};

export default RegistrationCard;
