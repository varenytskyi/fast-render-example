import { Meteor } from 'meteor/meteor'
import { Columns, Cards } from '/collections'


Template.app.onCreated(function () {
  this.subscribe('columns')
  this.subscribe('cards')
})


Template.app.helpers({
  columns() {
    return Columns.find()
  }
})


Template.cards.helpers({
  cards() {
    return Cards.find({column: this._id})
  }
})


Template.card.helpers({
  direction() {
    return this.column == 'one' ? 'Move >': '< Move'
  }
})


Template.card.events({
  'click .btn'() {
    let column = this.column == 'one' ? 'two' : 'one'
    Meteor.call('moveCard', this._id, column)
  }
})
