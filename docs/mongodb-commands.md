# MongoDD CLI Commands

## Summary

This is just a quick document listing various MongoDB CLI commands I end up using throughout development. It's pretty self explanatory.

## Useful references

Reference the below as needed:
- [MongoDB reference on operators](https://docs.mongodb.com/manual/reference/operator/)

## Delete everything in users

```js
db.users.deleteMany({})
```

## Delete everything in users that doesn't match a criteria

```js
db.users.deleteMany({$and: [
  {username: { $not: { $eq: 'guest' } }},
  {username: { $not: { $eq: 'yeet' } }}
]});
```