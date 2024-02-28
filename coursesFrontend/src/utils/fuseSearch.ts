import Fuse from 'fuse.js'

export const fuseSearch = (items: { label: string; value: number }[], searchString: string, options: object) => {
  console.log('FUSE', { items, searchString, options })
  const fuse = new Fuse(items, {
    ...options,
    // https://fusejs.io/api/options.html#keys
    // keys: keysToSearch,
    // shouldSort: true,
    // threshold: this.threshold,
    // distance: this.distance,
    // ignoreLocation: this.ignoreLocation,
  })

  if (!searchString?.length) {
    return items
  }

  return fuse.search(searchString).map(({ item }) => item)
}
