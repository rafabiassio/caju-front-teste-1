import { LoaderWrapper, LoaderContainer, LoaderImage, LoaderCircle } from "./styles";

const Loader = () => {
  return (
    <LoaderWrapper>
      <LoaderContainer>
        <LoaderCircle />
        <LoaderImage />
      </LoaderContainer>
    </LoaderWrapper>
  )
}

export default Loader;