import alt from 'alt'
import { createActions } from 'alt-utils/lib/decorators'
import { ImageSource } from 'sources'

@createActions(alt)
export default class ImageActions {
  constructor() {
    this.generateActions(
      'setImages',
    )
  }

  // Boilerplate example: getting a user and setting them
  fetchImages(token) {
    this.setImages([])
    return ImageSource.fetchImages(token).then(resp => {
      this.setImages(resp)
    }).catch(error => {})
  }
}
