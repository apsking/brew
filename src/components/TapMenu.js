import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Image from './Image'

import _kebabCase from 'lodash/kebabCase'

import './TapMenu.css'

export const query = graphql`
  fragment TapMenu on MarkdownRemark {
    frontmatter {
      beerlist {
        alt
        type
        image
        title
        abv
        ibu
        description
        pourOz
        pourPrice
        crowlerPrice
        growlerPrice
        isMenuHidden
      }
    }
  }
`

const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default class TapMenu extends Component {
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

    const beers = beerlist.filter(beer => !beer.isMenuHidden)

    return (
      <Fragment>
        <div className="TapMenu">
        <Image
          background
          resolutions="large"
          src={"/images/chalkboard.jpeg"}
          size="fit"
        />
          {beerlist && beers.length > 0 && (
            beers.map((beer, index) => (
              <div
                className="TapMenu--Item"
                key={_kebabCase(beer.alt) + '-' + index}
              >
                <h2 className="TapMenu--Item--Title">{index + 1}. {beer.title}</h2>
                <div>{beer.type} - {beer.abv}% ABV - {beer.ibu} IBU</div>
                <div>
                  {beer.pourOz}oz <b className="TapMenu--Item--Price">{CURRENCY_FORMATTER.format(beer.pourPrice)}</b>{" "}
                  {beer.crowlerPrice && <span> - 32oz Crowler <b className="TapMenu--Item--Price">{CURRENCY_FORMATTER.format(beer.crowlerPrice)}</b></span>}
                  {beer.growlerPrice && <span> - 64oz Growler <b className="TapMenu--Item--Price">{CURRENCY_FORMATTER.format(beer.growlerPrice)}</b></span>}
                  </div>
              </div>
            ))
        )}
        <div className="TapMenu--Footer">
        <h2 className="taCenter">
            Follow us{' '}
            <a href="https://instagram.com/earthandfirebrewing/">@earthandfirebrewing</a>
          </h2>
        </div>
        </div>
        
      </Fragment>
    )
  }
}

TapMenu.propTypes = {
  beerlist: PropTypes.array.isRequired
}
