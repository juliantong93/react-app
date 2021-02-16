import { imageBaseUrl } from "../config/baseUrl";

// function to append image path with full url
export function getImgUrl (path, width = 500) {
  return `${imageBaseUrl}/w${width}/${path}`
}