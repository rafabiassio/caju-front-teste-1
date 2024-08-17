import { StyledWrapper } from "./styles";

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <StyledWrapper>
      <main>{children}</main>
    </StyledWrapper>
  )
}

export default Layout;