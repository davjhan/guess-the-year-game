export {}
import airtable, { FieldSet, Records } from 'airtable'
import * as fs from 'fs'
import marked from 'marked'

function fixEmphasis(str: string) {
	let foundIndex = 0
	let processed = []
	for (let i = 0; i < str.length; i++) {
		processed.push(str[i])
		if (str[i] === '_') {
			foundIndex++
			if (foundIndex % 2 === 0) {
				if (i > 0 && str[i - 1] === ' ') {
					processed.pop()
					processed.pop()
					processed.push('_')
					processed.push(' ')
				}
			}
		}

	}
	return processed.join('')
}

/*
 Airtable annoyingly doesn't do emphasis correctly. Sometimes, questions can be like "The move _Avatar _was a"
 and it will look italic in Airtable, but marked and other markdown processors can't process the _ effectively.
 So this method fixes the emphasis in a quick and dirty way to fix it to "The move _Avatar_ was a"
 */
function fixQuestionMarkdown(questions: Records<FieldSet>) {
	questions.forEach(it => {
		const q: string = it.fields.question as string
		it.updateFields({
			question: fixEmphasis(q)
		})
	})
}

async function main() {
	const base = airtable.base('appaCvWMc07LrEgKV')
	marked.setOptions({
		gfm: false
	})
	const questions = await base.table('Questions')
		.select({
			view: 'Grid view'
		}).all()

//	fixQuestionMarkdown(questions)
	const data = questions.map(it => ({
		year: it.fields.Year,
		question: marked.parseInline(it.fields.question)
	}))
	fs.writeFile('static/questions.json', JSON.stringify(data), err => {
		if (err) {
			console.error(err)
			return
		}
		//file written successfully
	})

	console.log(`questions`, data.length)
	return undefined
}

main()