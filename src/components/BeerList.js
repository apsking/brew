import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Image from './Image'

import _kebabCase from 'lodash/kebabCase'

import './BeerList.css'

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
        isWebsiteHidden
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
    const { beerlist } = this.props,
      maxCount = beerlist.length
    let loopCount = 1

    for (let i in beerlist) {
      if (this.getImageInfo(beerlist[i], i)) {
        this.setState({ loaded: loopCount === maxCount })
        loopCount++
      }
    }
  }

  render() {
    const { beerlist } = this.props

    const beers = beerlist.filter(beer => !beer.isWebsiteHidden);

    return (
      <Fragment>
        {beerlist && beers.length > 0 && (
          <div className="BeerList">
            {beers.map((beer, index) => (
              <div
                className="BeerList--Item"
                key={_kebabCase(beer.alt) + '-' + index}
              >
                <div>
                  <Image
                    resolutions="small"
                    backgroundSize="fit"
                    src={beer.image}
                    alt={beer.alt}
                  />
                </div>
                {beer.title && <h3>{beer.title}</h3>}
                {beer.abv && <span><b>ABV: </b>{beer.abv}%</span>}
                {beer.ibu && <span><b>IBU: </b>{beer.ibu}</span>}
                {beer.description && <p>{beer.description}</p>}
              </div>
            ))}
          </div>
        )}
      </Fragment>
    )
  }
}

BeerList.propTypes = {
  beerlist: PropTypes.array.isRequired
}
