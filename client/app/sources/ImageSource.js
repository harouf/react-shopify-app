import alt from 'alt'
import axios from 'axios'
import { API_BASE } from 'consts'

// Boilerplate: ExtendedUserActions is for 'extending' a common user for things just this app needs

const ImageSource = {
  fetchImages: function(token) {
    const instance = axios.create({
      headers: { 'Authorization': token }
    })

    return instance.get(`${API_BASE}/users/images`)
      .then(res => res.data)
  }
}

export default ImageSource
