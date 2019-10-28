const uploadPhoto = (event, cb) => {
  // const preview = document.querySelector('.image-preview');
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    // preview.src = reader.result;
    const base64String = /,(.+)/.exec(reader.result)[1]; // selects and removes everything before the first comma
    // this.setState({ file: base64String });
    cb(base64String);
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
};

module.exports = { uploadPhoto };
