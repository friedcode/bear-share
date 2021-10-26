
export const getAlbums = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/albums')
    
    if (!response.ok) throw response.statusText;

    return response.json()
  } catch (e) {
    console.error(e)
    return []
  }
}

export const getPhotos = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos')
    
    if (!response.ok) throw response.statusText;

    return response.json()
  } catch (e) {
    console.error(e)
    return []
  }
}