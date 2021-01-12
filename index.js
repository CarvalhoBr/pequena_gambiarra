const questions = require('./questions.json')
const questionAccess = require('./question_access.json')
const fs = require('fs')

let repeatedIds = []
let allIds = []

function catchRepeatedIds(){
	questions.forEach(item => {
		if(allIds.includes(item.id)){
			
			if(repeatedIds.includes(item.id)){
				return
			}

			repeatedIds.push(item.id)
			return
		}
		allIds.push(item.id)
	})
}

function setNewIds(repeatedIds, questions, questionAccess, startIndex){
	let index = startIndex
	repeatedIds.map(id => {

		const questionIndex = questions.findIndex((element) => {return element.id === id})
		
		let questionAccessindexes = []
		questionAccess.map((item, index) => {
			if(item.id === id){
				questionAccessindexes.push(index)
			}
		})

		questions[questionIndex].id = index
		
		questionAccessindexes.map(item => {
			questionAccess[item].question_id = index
		})

		index++

	})
}

catchRepeatedIds()
var startIndex = 10000
while(repeatedIds.length !== 0){
	setNewIds(repeatedIds, questions, questionAccess, startIndex)

	repeatedIds = []
	allIds = []

	catchRepeatedIds()

	startIndex += 100
}

console.log(repeatedIds)

const formatedQuestions = questions.map(item => (JSON.stringify(item)+'\n'))
const formatedAccessQuestions = questionAccess.map(item => (JSON.stringify(item)+'\n'))

fs.appendFile('./formatedQuestions.json', formatedQuestions.toString(), (err) => {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});

fs.appendFile('./formatedQuestionAccess.json', formatedAccessQuestions.toString(), (err) => {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});

