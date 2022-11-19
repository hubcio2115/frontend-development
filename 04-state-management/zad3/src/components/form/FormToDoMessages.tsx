interface FormToDoMessagesProps {
  infoMessages: string[];
}

const FormToDoMessages = ({ infoMessages }: FormToDoMessagesProps) => (
  <ul
    style={{
      width: '33%',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}
  >
    {infoMessages.map((msg) => {
      return <li>{msg}</li>;
    })}
  </ul>
);

export default FormToDoMessages;
