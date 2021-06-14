const inputHandler = (event, setNotRequiredField, title) => {
  const { value, name } = event.target;
  setNotRequiredField((prev) => ({
    ...prev,
    [title.value]: {
      ...prev[title.value],
      [name]: value,
    },
  }));
};

export default inputHandler;
