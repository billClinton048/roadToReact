from flask_cors import CORS
from flask import Flask

# App
app = Flask(__name__)
CORS(app)

# Sample data
task =[
{"id": 1, "title": "Buy Milk", "done": False},
{"id": 2, "title": "Buy Sugar", "done": False},
{"id": 3, "title": "Relax", "done": False},
]

@app.route('/')
def home():
	return "Welcome to the Task Manager API!"

# GET ALL THE TASKS
@app.route('/tasks', methods =['GET'])
def get_tasks():
	return jsonify(tasks)

# POST A NEW TASK
@app.route('/tasks', methods = ['POST'])
def add_task():
	data = request.get_json()
	new_task = {
	"id": len(tasks) + 1,
	"title" : data.get("title"),
	"done" : False
	}
	task.append(new_task)
	return jsonify(new_task), 201


# TO UPDATE A TASK
@app.route('/tasks/<int:task_id>', methods = ['PUT'])
def update_task(task_id):
	data = request.get_json()
	for task in tasks:
		if task["id"] == task_id:
			# Update title if provided
			if "title" in data:
				task["title"] = data["title"]

			# Update the title
			if "done" in data:
				task["done"] = True
			return jsonify(task)

	return jsonify({"error": "Task not found"}), 404

if __name__ =='__main__':
	app.run(debug= True)
