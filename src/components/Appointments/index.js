import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../AppointmentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
const listOfComments = []

class Appointments extends Component {
  state = {
    name: '',
    comment: '',
    count: 0,
    commentsList: [],
  }

  nameFunction = event => {
    const name = event.target.value
    this.setState({name})
  }

  islikedFunctionClicked = islikedId => {
    const {commentsList} = this.state
    const fiteredIndex = commentsList.findIndex(
      eachItem => eachItem.id === islikedId,
    )
    commentsList[fiteredIndex].isLiked = !commentsList[fiteredIndex].isLiked
    this.setState({commentsList})
    // console.log(listOfComments)
  }

  commentFunction = event => {
    const comment = event.target.value
    console.log(format(new Date(comment), 'dd MMMM yyyy, EEEE'))
    this.setState({comment: format(new Date(comment), 'dd MMMM yyyy, EEEE')})
  }

  addToListFunction = event => {
    const {commentsList} = this.state
    event.preventDefault()
    const {name, comment} = this.state
    if (name === '' || comment === '') {
      alert('Name or Comment is missing')
    } else {
      commentsList.push({
        name,
        isLiked: false,
        comment,
        id: uuidv4(),
      })
      this.setState(prevState => ({
        count: prevState.count + 1,
        commentsList,
        name: '',
        comment: '',
      }))
    }
  }

  render() {
    const {name, comment, count, commentsList} = this.state
    console.log(commentsList)
    // console.log(listOfComments.length)
    return (
      <div className="css-bg-container">
        <h1 className="css-heading">Add Appointment</h1>
        <div className="css-containers">
          <form className="css-leftside-container" type="submit">
            <p>Say something about 4.0 Technologies</p>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="title"
              value={name}
              className="css-input-itself"
              onChange={this.nameFunction}
            />
            <label htmlFor="dateId">Date</label>
            <input
              id="dateId"
              type="date"
              value={comment}
              onChange={this.commentFunction}
            />

            <button
              type="button"
              className="css-button-itself"
              onClick={this.addToListFunction}
            >
              Add
            </button>
          </form>
          <div className="css-rightside-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="css-image-itself"
            />
          </div>
        </div>
        <h1>Appointments</h1>
        <ul className="css-ul-container">
          {count !== 0 &&
            commentsList.map(eachComment => (
              <CommentItem
                commentItem={eachComment}
                islikedFunction={this.islikedFunctionClicked}
                key={eachComment.id}
              />
            ))}
        </ul>
      </div>
    )
  }
}

export default Appointments
