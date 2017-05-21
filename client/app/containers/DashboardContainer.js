import React, { Component } from 'react'
import PropTypes from 'prop-types'
import connectToStores from 'alt-utils/lib/connectToStores'
import _ from 'lodash'
import Star from 'material-ui/svg-icons/toggle/star';
import { yellow700 } from 'material-ui/styles/colors';

import { ImageActions } from 'actions'
import { ImageStore } from 'stores'

import './dashboardContainer.scss'

// Boilerplate: Rather than 'dashboard', call your home something more descriptive like Plug in SEO's 'Checks'

@connectToStores
export default class DashboardContainer extends React.Component {
  static contextTypes = {
    currentUser: React.PropTypes.object,
  }

  static propTypes = {
    productImages: PropTypes.array,
  }

  static getStores() {
    return [ImageStore]
  }

  static getPropsFromStores() {
    return ImageStore.getState()
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    ImageActions.fetchImages(this.context.currentUser.accessToken)
  }

  render() {
    const { productImages } = this.props
    return (
      <div>
        {_.chunk(productImages, 5).map((group, i) =>
          <div key={i} className="image-group">
            {group.map((product, j) =>
              <div key={`${i}-${j}`} className="image-wrapper">
                <img key={i} src={product.optimized_url || product.url} alt="" />
                <div className="image-description">
                  <p className="image-title">{product.title}</p>
                  {product.optimized_url && <Star color={yellow700} style={{ width: '20px' }} />}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}
