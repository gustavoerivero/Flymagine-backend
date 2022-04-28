'use strict'

module.exports = (app) => {
  app.use('/role', require('./RRole'))
  app.use('/user', require('./RUser'))
  app.use('/notification', require('./RNotification'))
  app.use('/book', require('./RBook'))
  app.use('/literary-genre', require('./RLiteraryGenre'))
  app.use('/review', require('./RReview'))
  app.use('/comment-review', require('./RCommentReview'))
  app.use('/post', require('./RPost'))
  app.use('/photo-post', require('./RPhotoPost'))
  app.use('/comment-post', require('./RCommentPost'))
  app.use('/hashtag', require('./RHashtag'))
}