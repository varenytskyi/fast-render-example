import { Meteor } from 'meteor/meteor'
import { Match, check } from 'meteor/check'
import { Columns, Cards } from '/collections'
import { insertDummyData } from './initDummyData'


Meteor.startup(() => {
  insertDummyData()
});


Meteor.publish('columns', function () {
  return Columns.find()
})


Meteor.publish('cards', function () {
  let observers = []
  Columns.find().forEach(column => {
    let cursor = Cards.find({column: column._id})
    let observer = cursor.observeChanges({
      added: (id, document) => this.added('cards', id, document),
      changed: (id, fields) => this.changed('cards', id, fields),
      removed: (id) => this.removed('cards', id)
    })
    observers.push(observer)
  })

  this.onStop(() => {
    observers.forEach(observer => observer.stop())
  })

  this.ready()
})


Meteor.methods({
  moveCard(cardId, column) {
    check(cardId, String)
    check(column, Match.OneOf('one', 'two'))
    Cards.update(cardId, {$set: {column: column}})
  }
})