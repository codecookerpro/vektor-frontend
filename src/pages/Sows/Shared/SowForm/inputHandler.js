import moment from 'moment';

const inputHandler = (event, setNotRequiredField, title) => {
  const { value, name, type } = event.target;
  setNotRequiredField((prev) => ({
    ...prev,
    [title.value]: {
      ...prev[title.value],
      [name]: type === 'date' ? moment(value).toISOString() : value,
    },
  }));
};

export default inputHandler;
