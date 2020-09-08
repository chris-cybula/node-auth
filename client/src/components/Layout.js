import React from "react"
import styled from "styled-components"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"

const FooterWrapper = styled.div`
  background-color: black;
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
  min-height: 100vh;
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
      <main>{children}</main>
      <FooterWrapper>
        <span>© {new Date().getFullYear()}</span>
      </FooterWrapper>
    </Container>
  )
}

export default Layout
