# Testing
## Overview
This document describes how testing will be done on the codebase.

## The Testing Trophy
You might be familiar with the Testing Trophy if you follow Kent Dodds's blogs. He refers to a slight variation of the Test Pyramid(from Martin Fowler) which he calls the Testing Pyramid.

There are a couple of differences as below:
- static typings have been added in
  - Martin Fowler's Test Pyramid probably already assumes the presence of strong static typing already(his examples are in Java)
  - as we're building with tons of JavaScript now with static type checking, we can add that in
- the Testing Trophy takes into account your confidence in your tests
  - this means that while E2E and integration tests take more time to ... build, you'll be more confident in your tests
- the Testing Pyramid emphasizes integration tests over unit tests
  - you want to make sure the little units of your app work well together
  - a unit might have great tests but also not work well at all with other parts

For reference check out the below:
- [Ham Vocke on the Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Kent Dodds on writing tests](https://kentcdodds.com/blog/write-tests)

## Static Typing
As mentioned in the Read Me, this project uses TypeScript for static typing. Static typing makes writing the code slower and more verbose, due to all of the typings you have to do, however, it also makes maintenance much easier, as it's much harder to misuse code/ make breaking changes.

And as this is a solo full-stack project, that's a massive advantage that can't be understated.

## Backend Testing
Backend testing has a couple of challenges as seen below:
- need to test middleware functions
- everything being passed around is a Request, Response
- need to test database calls
- need to test middleware chains/ the actual Express Router

As of 09/03/2019, I'm only going to handle testing middleware functions. Testing the actual Express Router is possible with [SuperTest](https://github.com/visionmedia/supertest#readme), and that'll probably happen, but that's pretty far ahead.

Testing middleware functions is pretty straight-forwards as you can break everything down pretty handily. The primary concern is that the way the tests are currently done, the Request and Response object is mocked, which might not be super great.

## Frontend Testing
Frontend testing has the below challenges:
- need to test how React components interact
- need to test events
- need to test the eventual Redux reducers
- need to make backend calls

As we're using TypeScript, for the most part, we can skip testing normal Redux Action Creators.

For testing React components and their interactions, we can use [React Testing Library](https://testing-library.com/docs/react-testing-library/intro). React Testing Library actually generates a DOM from your code, so the tests become integration tests of sorts, but you'll know for sure they work. As a slight bonus, it'd be super easy to test for accessibility(a11y).

## Automated Testing
Automated testing is achieved with [TravisCI](https://docs.travis-ci.com/). With continuous integration, we can build the project on a dedicated machine everytime something is committed or if a pull request is submitted. It also sets us up for continuous delivery but that's a different topic.

In addition we can integrate [Coveralls](https://coveralls.io/) to obtain test coverage. Test coverage reports what it sounds like it reports, how much code do your tests cover.

For the purposes of this project a code coverage target of about 70-80% is probably fine, but I'm not going to sweat it if it's a bit lower.

## End To End Tests
End To End Tests are going to be tough. Full end to end tests from the rendered frontend to the backend are way beyond the scope of the project.

At most it'd be testing how frontend services integrate with the backend.
