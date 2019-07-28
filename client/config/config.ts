const ApiUri = process.env.NODE_ENV === 'production' ? 'https://wj-anothertodo.herokuapp.com/'
: `http://localhost:${process.env.PORT}`;

export { ApiUri };