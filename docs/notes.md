# Assorted notes

## Async Notes

- You don't need to provide a callback function for a lot of async methods that return a `Promise<T>` if you're using async/ await
  - see below:
  ```ts
  try {
    const result = await User.find({username: username});
    if (result.length === 0) {
      const salt = await bcrypt.genSalt(10);
      const newPass = await bcrypt.hash(password, salt);
      const user = await User.create({ username: username, password: newPass });
      console.log('I am sending a response');
    } else {
      const resJson: responseObj = {
        msg: `Error, user with username: ${username} exists already`
      }
      res.status(400).json(resJson);
    }
  }
  ```