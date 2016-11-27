const EMPTY = []

const Storage = {
  retrieve (identifier) {
    const items = JSON.parse(
      localStorage.getItem(`viewer_${identifier}`)
    )

    return items || EMPTY
  },

  store (identifier, element) {
    const store = this.retrieve(identifier)
    const isAlreadyRegistered = store.includes(element)

    if (isAlreadyRegistered) return

    store.push(element)
    localStorage.setItem(
      `viewer_${identifier}`,
      JSON.stringify(store)
    )
  }
}

export default Storage
