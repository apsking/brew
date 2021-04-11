import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Image from './Image'

import _kebabCase from 'lodash/kebabCase'

import './Calendar.css'

export const query = graphql`
  fragment Calendar on MarkdownRemark {
    frontmatter {
      calendar {
        alt
        image
        title
        date
        time
        description
      }
    }
  }
`

export default class Calendar extends Component {
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
    const { calendar } = this.props,
      maxCount = calendar.length
    let loopCount = 1

    for (let i in calendar) {
      if (this.getImageInfo(calendar[i], i)) {
        this.setState({ loaded: loopCount === maxCount })
        loopCount++
      }
    }
  }

  render() {
    const { calendar } = this.props
    return (
      <Fragment>
        {calendar && calendar.length > 0 && (
          <div className="Calendar">
            {calendar.map((event, index) => (
              <div
                className="Calendar--Item"
                key={_kebabCase(event.alt) + '-' + index}
                tabIndex={0}
                aria-label="Toggle Calendar"
                role="button"
              >
                <div>
                  <Image
                    resolutions="small"
                    src={event.image}
                    alt={event.alt}
                  />
                </div>
                {event.title && <b>{event.title}</b>}
                {event.date && <span>Date: {event.date}</span>}
                {event.time && <span>Time: {event.time}</span>}
                {event.description && <p>{event.description}</p>}
              </div>
            ))}
          </div>
        )}
      </Fragment>
    )
  }
}

Calendar.propTypes = {
  calendar: PropTypes.array.isRequired
}
