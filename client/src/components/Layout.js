import React from "react"
import styled from "styled-components"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"

const FooterWrapper = styled.div`
  background-color: black;
  color: white;
  margin: 20px 0;
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
    <>
      <Helmet title={`${title} | ${site.siteMetadata.title}`} />
      <Link to={location}>{link}</Link>
      <main>{children}</main>
      <FooterWrapper>
        <span>© {new Date().getFullYear()}</span>
      </FooterWrapper>
    </>
  )
}

export default Layout
