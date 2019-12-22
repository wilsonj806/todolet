# Functional Programming
## Overview
This doc is a quick overview of functional programming. Functional programming is a programming paradigm that's pretty great. In the context of JavaScript though, we can't be purely functional because JavaScript is a dynamic language and some other stuff. We can however, practice a functiona style of programming within our JavaScript, which gets us close enough.

## Core Principles
1. pure functions, function should have repeatable outputs for the same inputs
2. data immutability, you can't change the input or try to change stuff outside the scope of a pure function


## Handling IO/ async
Handling IO is actually pretty straight-forwards to a certain degree in FP. Since IO actions are not deterministic(i.e your result may vary with the same input), we can't make pure functions out of them.

This then means that to stay FP, we should minimize the amount of returned values we have with these impure functions and isolate their usage.

One way to handle this is to use thunks, where we make our impure function and perform our IO and then input callback functions to perform additional operations on our impure result.

For example, see the below:
```ts
const computeTax = (price: number): number => price * 1.08
const computeTotalCost = async (callbackFn) => {
  const res = await getOrderCost()
  const total = computeTax(res);
  callbackFn(total)
}
```

