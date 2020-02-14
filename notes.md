# Jiffy

- With create react app , we can write methods inside component as arrow functions instead of using constructor and bind
- `onChange()` Fires when there’s a change in any of the form’s input elements, each keystroke
- Can not use `console.log(event.key);` to see key presses
- To see what key we use we need to use `onKeyPress()`

- I split out my components into different files but i need to access the state form one into another, have just added the search intot he base app for now and will figure out how to lift up state.

- Everytime the input is updated,
  - Runs the `handleChange` event
    - It sets the state with `setState()`
      - set the `searchTerm` and the `hintText`
  - `hintText` is being passed down into the userText Component in render `<userText />`
  - That component is being picked in the properties from where it is defined `const userHint`
  - Being rendered out inside where it is defined.

* Promise is a way for JS to wrap up async code that happens in the BG.
* fetch is wrapped inside a promise - making a promise that it will send something back, result or error etc. This style of using `fetch` is called a Promise chain (because the .then() bits are like a chain of data getting sent along).

```



async function getData() {
  // it starts by trying to run whatever code we tell it
  try {
    const response = await fetch('https://api.website.com/data')
    const data = await response.json()
    return doSomething(data)
    // if something goes wrong, it jumps down to the catch part
  } catch (error) {
    // we can then deal with the error separately
    alert(error.message)
  }
}



```

- asyncronous function by added async before the function `async function getData (){}`
- use `await` keyword inside `async` function.

## State

(Understanding state)[https://codeburst.io/react-js-understanding-state-e875911e921c]
