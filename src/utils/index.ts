const UUID = () => {
  return URL.createObjectURL(new Blob()).substr(-36);
};

export { UUID };
