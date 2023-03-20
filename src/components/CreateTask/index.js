import {Component} from 'react'
import {v4} from 'uuid'

import TagsDisplay from '../TagsDisplay'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class CreateTask extends Component {
  state = {
    task: '',
    tagLine: tagsList[0].displayText,
    taskList: [],
    optionIdInput: '',
  }

  onAddTask = event => {
    event.preventDefault()
    const {task, tagLine} = this.state
    if (task !== '') {
      const newTask = {
        id: v4(),
        task,
        tagLine,
      }
      this.setState(ps => ({
        taskList: [...ps.taskList, newTask],
        task: '',
        tagLine: '',
      }))
    }
  }

  onChangeTask = event => this.setState({task: event.target.value})

  onChangeTagLine = event => this.setState({tagLine: event.target.value})

  tagChange = id => {
    this.setState({optionIdInput: id})
  }

  render() {
    const {task, tagLine, optionIdInput, taskList} = this.state
    let filterList = []
    if (optionIdInput === '') {
      filterList = taskList
    } else {
      filterList = taskList.filter(
        x => x.tagLine.toLowerCase() === optionIdInput.toLowerCase(),
      )
    }

    return (
      <div>
        <h1>Create a task!</h1>
        <form onSubmit={this.onAddTask}>
          <label htmlFor="task">Task</label>
          <input
            id="task"
            type="text"
            placeholder="Enter the task here"
            value={task}
            onChange={this.onChangeTask}
          />
          <label htmlFor="tags">Tags</label>
          <select
            name="tags"
            id="tags"
            value={tagLine}
            onChange={this.onChangeTagLine}
          >
            <option value="HEALTH">Health</option>
            <option value="EDUCATION">Education</option>
            <option value="ENTERTAINMENT">Entertainment</option>
            <option value="SPORTS">Sports</option>
            <option value="TRAVEL">Travel</option>
            <option value="OTHERS">Others</option>
          </select>
          <button type="button" onClick={this.onAddTask}>
            Add Task
          </button>
        </form>
        <h1>Tags</h1>
        <ul>
          {tagsList.map(each => (
            <TagsDisplay
              details={each}
              key={each.optionId}
              tagChange={this.tagChange}
            />
          ))}
        </ul>
        <h1>Tasks</h1>
        {filterList.length === 0 ? (
          <p>No Tasks Added Yet</p>
        ) : (
          <ul>
            {filterList.map(each => (
              <li key={each.id}>
                <p>{each.task}</p>
                <p>{each.tagLine}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default CreateTask
