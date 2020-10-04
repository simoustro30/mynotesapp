import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import config from '../config'
import './Note.css'
import PropTypes from 'prop-types'

export default class Note extends React.Component {

  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id
    console.log(noteId)

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
      })
      .then(() => {
        console.log('wheeeeee')
          this.context.deleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const date= format(
      new Date(this.props.modified),
      'MM/dd/yyyy'
    )
    console.log(this.context.deleteNote);
    const { name, id} = this.props
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {date}
            </span>
          </div>
        </div>
      </div>
    )
  }
}


Note.propTypes = {
  onDeleteNote: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  modified: PropTypes.string
}