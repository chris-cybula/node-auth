import React from "react"
import styled from "styled-components"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"

const FooterWrapper = styled.div`
  color: white;
  margin-top: auto;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 16px);
`

const Main = styled.div`
  width: 100%;
`

const Layout = ({ link, location, title, children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  return (
    <Container>
      <Helmet title={`${title} | ${site.siteMetadata.title}`} />
      <Main>{children}</Main>
      <FooterWrapper>
        <span>© {new Date().getFullYear()}</span>
      </FooterWrapper>
    </Container>
  )
}

export default Layout
