export const MessageComponent = ({ _, data }) => {
  return (
    <div key={_} className="message">
      <p>{data.username}</p>
      <p>{data.message}</p>
    </div>
  );
};
