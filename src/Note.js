const Note = ({ title, body, userId }) => {
  return (
    <li>
      <h1>{title}</h1>
      <small>{body}</small>
      <p>User id: {userId}</p>
    </li>
  );
};

export default Note;
