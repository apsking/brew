import React from 'react'
import { graphql } from 'gatsby'

import TapMenu from '../components/TapMenu'

// Export Template for use in CMS preview
export const TapMenuPageTemplate = ({
  beerlist
}) => (
  <main>
    <section className="section">
      <div className="container">
        <TapMenu beerlist={beerlist} />
      </div>
    </section>
  </main>
)

const TapMenuPage = ({ data: { page } }) => (
  <TapMenuPageTemplate {...page} {...page.frontmatter} body={page.html} />
)

export default TapMenuPage;

export const pageQuery = graphql`
  query TapMenuPage {
    page: markdownRemark(id: { eq: "a4af7ac3-7e83-55d9-ab04-62f0a13d661f" }) {
      ...Meta
      ...TapMenu
      html
    }
  }
`
