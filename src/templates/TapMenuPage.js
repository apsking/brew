import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import TapMenu from '../components/TapMenu'

// Export Template for use in CMS preview
export const TapMenuPageTemplate = ({
  beerlist,
  menuMessage
}) => (
  <Fragment>
    <Helmet>
      <link href="https://ucarecdn.com" rel="preconnect" crossorigin />
      <link rel="dns-prefetch" href="https://ucarecdn.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Domine&display=swap" rel="stylesheet"/>
      {/* Add font link tags here */}
    </Helmet>
    <main>
      <TapMenu beerlist={beerlist} menuMessage={menuMessage} />
    </main>
  </Fragment>
)

const TapMenuPage = ({ data: { page } }) => (
  <TapMenuPageTemplate {...page} {...page.frontmatter} body={page.html} />
)

export default TapMenuPage;

export const pageQuery = graphql`
  query TapMenuPage {
    page: markdownRemark(fileAbsolutePath: { regex: "/beers.md/" }) {
      ...Meta
      ...TapMenu
      html
    }
  }
`
