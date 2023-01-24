# Truth Table Generator

Truth Table Generator is a simple website about Logic. It generates a truth table for two statements based on a logical connective. One can also negate one or both of the statements.

You can read these to understand the project better:

- [Logic](https://simple.wikipedia.org/wiki/Logic)
- [Statement](https://en.wikipedia.org/wiki/Statement_(logic))
- [Logical connective](https://www.britannica.com/topic/connective-logic)
- [Truth table](https://en.wikipedia.org/wiki/Truth_table)

## Why I Made This Project

I'm curious about Logic, and I wanted to create a project that I'll have to test my skills. 

## Notes

The generated truth table is enclosed in `<table>` HTML tag.

The padding of each cell of the truth table resizes when it doesn't fit the screen so that it's readable for smaller devices.

You **can't** use multiple logical connectives (except for *not*):
```
"p or q or r" or "p or (q or r)" aren't possible.
```
