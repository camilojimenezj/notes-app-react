const Notification = ({ errorMessage, message }) => {
  return (
    <div className='error'>
      <p>{message}</p>
      <p>{errorMessage}</p>
    </div>

  )
}

export default Notification
