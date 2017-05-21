import alt from 'alt'
import { createStore, bind } from 'alt-utils/lib/decorators'
import { ImageActions } from 'actions'

@createStore(alt)
export default class ImageStore {
  constructor() {
    this.state = {
      productImages: [],
    }
    this.bindActions(ImageActions)
  }

  static displayName = 'ImageStore'

  setImages(productImages) {
    this.setState({ productImages })
  }
}
