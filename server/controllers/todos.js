const Todo = require('../models/Todo')

module.exports = {
	getTodos: async (req, res) => {
		try {
			let todos = await Todo.find()
			let todosCount = await Todo.countDocuments({ completed: false })
			res.json({
				todos: todos,
				count: todosCount,
			})
		} catch (err) {
			console.error('Not serving App.js')
		}
	},
	addTodo: async (req, res) => {
		console.log(`req.body: ${req.body.todo}`)
		try {
			await Todo.create({
				todo: req.body.todo,
				created: Date.now(),
				completed: false,
			})
			res.redirect('/todos')
		} catch (err) {
			console.log(err)
		}
	},
	toggleComplete: async (req, res) => {
		console.log('blah ' + req.body.todoID)
		try {
			await Todo.findById(req.body.todoID, (err, todo) => {
				if (err) {
					console.log(err)
				}
				todo.completed = !todo.completed
			})
		} catch (err) {
			console.log(err)
		}
	},
	removeTodo: async (req, res) => {
		console.log('controller removeTodo running...')
		try {
			await Todo.findOneAndDelete({ _id: req.body.todoID })

			console.log('Deleted Todo')
			res.json('Deleted Todo')
		} catch (err) {
			console.log(err)
		}
	},
}
