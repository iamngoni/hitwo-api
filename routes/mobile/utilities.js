const Stores = require('./../../models/store')

module.exports = {
  findStoresById: async(storeId) => {
    var store = await Stores.findById(storeId)
    return store
  }
}