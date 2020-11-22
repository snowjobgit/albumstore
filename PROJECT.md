###### Links

* [Music Website Templates](https://colorlib.com/wp/music-website-templates/)
* [localStorage in React](https://programmingwithmosh.com/react/localstorage-react/)
* [Functional component Redux and loading data](https://stackoverflow.com/questions/62118009/react-functional-component-redux-and-loading-data)
* [Load sort and filter data with React](https://moduscreate.com/blog/ext-js-to-react-load-sort-and-filter-data-with-react/)
* [Advanced filtering with React and Redux](https://soshace.com/filtering-sorting-and-pagination-advanced-filtering-with-react-and-redux/)
* [React player](https://github.com/CookPete/react-player#props)


###### Questions about React

* What is React? How is it different from other JS libraries/frameworks?
* What happens during the lifecycle of a React component?
* What can you tell me about JSX?
* What's the difference between Real DOM and Virtual DOM?
* What are the limitations of React?
* Explain the purpose of render() in React
* What is a state in React and how is it used?
* What's the difference between states and props?

*State is similar to props, but it is private and fully controlled by the component. State is often called local or encapsulated. It is not accessible to any component other than the one that owns and sets it.*

* What's an arrow function in React? How is it used?
* What's the difference between a Class component and a Functional Component?
* What's the difference between a stateless component and a pure component?
* Explain the lifecycle methods of React components in detail.
* What are Higher Order Components (HOC)?


###### Questions about Redux

* Why should you never mutate state in Redux?

There are several reasons why you must not mutate state in Redux:

* It causes bugs, such as the UI not updating properly to show the latest values
* It makes it harder to understand why and how the state has been updated
* It makes it harder to write tests
* It breaks the ability to use "time-travel debugging" correctly
* It goes against the intended spirit and usage patterns for Redux