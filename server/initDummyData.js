import { Columns } from '/collections'
import { Cards } from '/collections'


export function insertDummyData () {
  initColumnsCollection()
  initCardsCollection()
}


function initColumnsCollection () {
  if (Columns.find().count()) {
    return
  }
  let columns = JSON.parse(Assets.getText('columns.json'))
  columns.forEach(column => {
    Columns.insert(column)
  })
}


function initCardsCollection () {
  if (Cards.find().count()) {
    return
  }
  let cards = JSON.parse(Assets.getText('cards.json'))
  cards.forEach(card => {
    Cards.insert(card)
  })
}