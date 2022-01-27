const getExtensionFile = (file_name) => {
  const arr = file_name.split(".");
  return arr[arr.length - 1];
};

module.exports = {
  getExtensionFile,
};
