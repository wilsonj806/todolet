# Continuous Integration

## What is CI

Continuous integration's core idea is that by rebuilding your project as changes are pushed into your codebase, and automating your testing, then you save time and your code gets better. It means you need to have a rigorous testing scheme set up, but saves time when done well.

This document mostly deals with the setup of CI via [TravisCI](https://travis-ci.org) though as seen below.

## Travis CI

### Prequisites

Travis CI is configured in your repo via a YAML file with the name: `.travis.yml`.

Below is kind of a quick start:

  ```yml
    # This is a comment
    example_var: "I'm an example var"

      var_that_isnt_nested: "I'm not nested"

      - nested_var1: "I'm part of a nested list as indicated by the hyphen"
      - nested_var2: "I'm part of a nested list as indicated by the hyphen"
      - nested_var3: "I'm part of a nested list as indicated by the hyphen"
  ```
As a general note, hyphenated lines denote lists/ sequences, and nesting is usually done this way.
