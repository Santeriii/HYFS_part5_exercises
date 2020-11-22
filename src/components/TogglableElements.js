import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TogglableBlogs = (props) => {
  const [full, setFull] = useState(false)

  const normalBlogData = { display: full ? 'none' : '' }
  const fullBlogData = { display: full ? '' : 'none' }

  const toggleVisibility = () => {
    setFull(!full)
  }

  TogglableBlogs.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    buttonLabelFull: PropTypes.string.isRequired,
    normalBlogs: PropTypes.isRequired,
    fullBlogs: PropTypes.isRequired
  }

  return (
    <div className="togglableContent">
      <div style={normalBlogData}>
        {props.normalBlogData}
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={fullBlogData}>
        {props.fullBlogData}
        <button onClick={toggleVisibility}>{props.buttonLabelFull}</button>
      </div>
    </div>
  )
}

TogglableBlogs.displayName = 'TogglableBlogs'

export default TogglableBlogs