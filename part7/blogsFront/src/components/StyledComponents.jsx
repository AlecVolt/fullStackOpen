import styled from 'styled-components'

export const AppContainer = styled.div`
  margin: 0;
  padding: 0;
  font-size: 16px;
  color: #324c4d;

  h1 {
    font-size: 52px;
  }

  h2 {
    font-size: 48px;
  }

  h3 {
    font-size: 32px;
  }

  a {
    text-decoration: none;
    color: #da8e89;
  }
  a:hover {
    color: #324c4d;
  }
`

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`

export const CenteredPage = styled.section`
  text-align: center;
`

export const StyledButton = styled.button`
  border-radius: 12px;
  padding: 4px 12px;
  margin: 0 8px 4px;
  background-color: transparent;
  cursor: pointer;
  transition:
    color 0.3s,
    background-color 0.3s;

  &:hover {
    background-color: #da8e89;
    color: black;
  }
`
export const OrderButtonContainer = styled.div`
  margin: 16px 0 24px;
`

export const StyledLink = styled.a`
  text-decoration: none;
  color: #da8e89;
  transition: color 0.3s;
  &:hover {
    color: #324c4d;
  }
`

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  background-color: rgba(113, 156, 163, 0.5);
`
export const NavLinksContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;

  a {
    font-size: 24px;
    margin: 0 25px;
    color: #966e30;
  }
`
export const NavLoginContainer = styled.div`
  a,
  span,
  button {
    font-size: 24px;
  }
`
export const StyledInput = styled.input`
  margin: 0 0 8px 8px;
  padding: 4px 12px;
  border-radius: 12px;
`

export const BlogContainer = styled.div`
  padding: 4px 4px;
  margin: 10px 0;
  background-color: rgba(113, 156, 163, 0.1);
`
export const StyledList = styled.ul`
  text-align: left;
  padding-left: 32px;
`

export const StyledTable = styled.table`
  th,
  td,
  td a,
  b {
    font-size: 20px;
  }
`
