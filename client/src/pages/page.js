import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const PageWrapper = styled.div`
  background-color: gray;
`

const Page = () => (
  <PageWrapper>
    <Link to={"/"}>Index</Link>
    <h1>Page</h1>
  </PageWrapper>
)

export default Page
