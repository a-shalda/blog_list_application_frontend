const Notification = ({ message, messageClassName }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={messageClassName}>
      {message}
    </div>
  )
}

export default Notification