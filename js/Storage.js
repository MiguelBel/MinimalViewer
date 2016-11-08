const Storage = {
  retrieve(identifier) {
    let items = JSON.parse(
      localStorage.getItem(`viewer_${identifier}`)
    );

    return items || this._empty();
  },

  store(identifier, element) {
    let alreadyStored = this.retrieve(identifier)
    let isPendingToBeRegistered = alreadyStored.indexOf(element) == -1

    if(isPendingToBeRegistered) {
      alreadyStored.push(element);

      localStorage.setItem(
        `viewer_${identifier}`,
        JSON.stringify(alreadyStored)
      );
    }
  },

  _empty() {
    return [];
  }
}
export default Storage
