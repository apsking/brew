import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content.js'
import Layout from '../components/Layout.js'
import Calendar from '../components/Calendar'

// Export Template for use in CMS preview
export const EventsPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  section1,
  section2,
  calendar
}) => (
  <main>
    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />
    {section1 && <section className="section">
      <div className="container">
        <Content source={section1} />
      </div>
    </section>}

    <section className="section">
      <div className="container">
        <Calendar calendar={calendar} />
      </div>
    </section>

    {section2 && <section className="section">
      <div className="container">
        <Content source={section2} />
      </div>
    </section>}
  </main>
)

const EventsPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <EventsPageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default EventsPage;

export const pageQuery = graphql`
  query EventsPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      ...Calendar
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
