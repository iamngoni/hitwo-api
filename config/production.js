module.exports = {
  env: 'production',
  db: 'mongodb+srv://iamngoni:LipkH1wCJ67JstGY@cluster0.dzneh.mongodb.net/<dbname>?retryWrites=true&w=majority',
  port: process.env.PORT,
  message: 'Connected to MongoAtlas Database',
  base_url: 'http://hitwo-api.herokuapp.com'
}