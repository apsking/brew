import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Image from './Image'

import _kebabCase from 'lodash/kebabCase'

import './BeerList.css'
import 'react-photoswipe/lib/photoswipe.css'

export const query = graphql`
  fragment BeerList on MarkdownRemark {
    frontmatter {
      beerlist {
        alt
        image
        title
        abv
        ibu
        description
      }
    }
  }
`

export default class BeerList extends Component {
  state = {
    loaded: false,
    isOpen: false,
    sliderImages: [],
    index: 0
  }

  isOpen(isOpen, index) {
    if (typeof index === 'undefined') index = 0
    this.setState({ isOpen, index })
  }
  handleKeyDown = ev => {
    if (ev.keyCode === 13 && !this.state.isOpen) {
      // enter to open
      this.isOpen(true, this.state.index)
    }
  }

  getImageInfo = (img, index) =>
    fetch(img.image + '-/json/')
      .then(res => res.json())
      .then(
        result => {
          const newImagesArr = [...this.state.sliderImages]
          newImagesArr[index] = {
            src: img.image,
            title: img.title,
            w: result.width,
            h: result.height
          }
          this.setState({
            sliderImages: newImagesArr
          })
          return true
        },
        error => {
          console.log(error)
          return false
        }
      )

  componentDidMount() {
    const { images } = this.props,
      maxCount = images.length
    let loopCount = 1

    for (let i in images) {
      if (this.getImageInfo(images[i], i)) {
        this.setState({ loaded: loopCount === maxCount })
        loopCount++
      }
    }
  }

  render() {
    const { images } = this.props
    return (
      <Fragment>
        {images && images.length > 0 && (
          <div className="BeerList">
            {images.map((image, index) => (
              <div
                className="BeerList--Item"
                key={_kebabCase(image.alt) + '-' + index}
                tabIndex={0}
                aria-label="Toggle BeerList"
                role="button"
              >
                <div>
                  <Image
                    resolutions="small"
                    src={image.image}
                    alt={image.alt}
                  />
                </div>
                {image.title && <b>{image.title}</b>}
                {image.abv && <span>ABV: {image.abv}</span>}
                {image.ibu && <span>IBU: {image.ibu}</span>}
                {image.description && <p>{image.description}</p>}
              </div>
            ))}
          </div>
        )}
      </Fragment>
    )
  }
}

BeerList.propTypes = {
  images: PropTypes.array.isRequired
}
