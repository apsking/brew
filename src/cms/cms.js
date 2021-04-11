import React from 'react'
import CMS from 'netlify-cms-app'
import './cms-utils'

import { HomePageTemplate } from '../templates/HomePage'
import { BreweryPageTemplate } from '../templates/BreweryPage'
import { ContactPageTemplate } from '../templates/ContactPage'
import { DefaultPageTemplate } from '../templates/DefaultPage'
import { OurBeersPageTemplate } from '../templates/BeersPage'
import uploadcare from 'netlify-cms-media-library-uploadcare'

CMS.registerMediaLibrary(uploadcare)

if (
  window.location.hostname === 'localhost' &&
  window.localStorage.getItem('netlifySiteURL')
) {
  CMS.registerPreviewStyle(
    window.localStorage.getItem('netlifySiteURL') + '/styles.css'
  )
} else {
  CMS.registerPreviewStyle('/styles.css')
}

CMS.registerPreviewTemplate('home-page', ({ entry }) => (
  <HomePageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('brewery-page', ({ entry }) => (
  <BreweryPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('beers-page', ({ entry }) => (
  <OurBeersPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('contact-page', ({ entry }) => (
  <ContactPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('infoPages', ({ entry }) => (
  <DefaultPageTemplate {...entry.toJS().data} />
))
