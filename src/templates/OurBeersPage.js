import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content.js'
import Layout from '../components/Layout.js'
import BeerList from '../components/BeerList'

// Export Template for use in CMS preview
export const OurBeersPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  section1,
  section2,
  beerlist
}) => (
  <main>
    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />
    <section className="section">
      <div className="container">
        <Content source={section1} />
      </div>
    </section>

    <section className="section">
      <div className="container">
        <BeerList images={beerlist} />
      </div>
    </section>

    <section className="section">
      <div className="container">
        <Content source={section2} />
      </div>
    </section>
  </main>
)

const OurBeersPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <OurBeersPageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default OurBeersPage

export const pageQuery = graphql`
  query OurBeersPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      ...BeerList
      html
      frontmatter {
        title
        template
        subtitle
        featuredImage
        section1
        section2
      }
    }
  }
`
