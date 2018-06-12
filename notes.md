# React Training

Object Partners
Dustin Schau

## Intro to Javascript
Node.js/server side js

### Basics

Variable Declaration -
    var xyz = ...
    instead use (as of ES2015) : let xyz = ... and const xyz = ...
    "let" is block scoped
Types -
    Symbols - enforce constants (ex. Key in a map) cannot be reassigned or reinitialized
    Object: const o = {}
    Array: const o = [...]
Comments - // or /* .. */
Comparisons -
    === (triple equals) strict equality - does not coerce types like abstract equality (==)
    prefer strict equality.
    be careful because all operators apply type coercion.
Conditional -
    let x = a || b
Functions -
    function xyz() {..}
    const f = function(x) { .. }
    const f = arg => ...
    Dont Do This: const f = new Function("", ...")
    
    compiler doesn't prevent calling with a different number of arguments. Typescript can provide this compile time validation

### ES2015 (ES6)
All labs use ES2015 features
ECMAScript is Javascript, releases in yearly iterations.

export -
    one place:
        export const f = () => "bar"
    another place:
        import {f} from "./f"
    - webpack allows for this
    - allows modularization

let/const -
    block scoped.
    const cannot be reassigned.
    * prefer const unless explicity needing to reassign or mutate

class -
    syntactic sugar for JS prototype
    ex. var Animal = function () {
        ..
    }

    vs.

    class Animal {
        constructor(...) {

        }
    }

arrow function -
    doesn't create a new "this"

    function() {...} vs. () => {...}

    function Timer() {
        this.seconds = 0;
        var self = this;

        setInterval(function() {
            // "this" is different here
            self.seconds += 1;
        })
    }

    function Timer() {
        this.seconds = 0;
        setInterval(() => {
            this.seconds += 1
        })
    }

template strings -
    multi-line strings, variable replacement (uses backticks)

    const multilineStr = `I am
    a
    multiline string`

    const varReplacement = `${multilineStr} additional content`

destructuring -
    const { hello, other, another } = obj (pulls properties from obj, names match keys)

rest/spread
    arr = ['a', 'b', 'c']
    const [a, ...rest] = arr (a = 'a', rest = ['b', 'c']) naming doesn't matter here

    spread:
        const nums = [10, 20, 30];

default arguments:
    function greet(name, greeting = "Hello") -- "Hello" is default
    greet("world");
    greet("world", "hallo")

resources:
    MDN - mozilla developer network
        clearer docs, more accurate

## React

### Frontend Tools
- Node.js - javascript runtime environment
    - can be backend server (non-browser.)
    - use for something - unit test runner, code minimizer during build process
    - huge ecosystem (can get reusable code.)
- NPM package manager for Node.js
    - dependency management
    - references NPM registry
- Yarn community driven package manager for Node.js (created by Facebook)
    - same functionality as NPM
    - claims more efficient use of network and deterministic dependency resolution
        - eliminating "works on my machine" yarn.lock (or package.lock.json) by defining exact dependency versions to use
    - Labs in "Monorepo"
        - "Yarn workspaces" makes setup easy.
- package.json 
    - defines application metadata, dependencies
    - similar to maven POM
- create-react-app (bootstrap react app from FB)
    - opinionated stack
    - webpack, babbel (transpiles to previous JS versions.)
    - "Eject" avoid this.
        - can PULL updates to build tooling by updating dependency.
- webpack
    - reputation: hard to configure (use create-react-app)
    - module bundler   
        - bundles dependencies
        - makes static assets
        - source maps (for debugging)
- Hapi
    - API server for node: RESTful backend using Node
- Jest
    - used by create-react-app 
    - unit test runner
    - fast (runs in parallel)
    - built in: assertion, mocking, code coverage
    - snapshots
        - snapshot of serialized object, does a comparison (what does structure/component look like at a given time?)
    - BDD style (reads like English)
- Axios/Moxios
    - enhancements to "fetch" api, abstracts DOM
    - axios is used to make requests, moxios is used for mocking axios
    - browser API is verbose, fetch is less verbose, axios removes some weirdness from "fetch"

        axios.get('/api/users')
            .then(response => console.log(...))
            .catch(error => console.log(...));

    - "promise" is alternative to callback.
        - API for promise: then (returns additional promise), catch handles error.
    - stubbing API
    
        moxios.stubRequest('/api/users', {
            // define stubbed response here.
        })

### Project Layout
- Monorepo, labs are in subdirectory
    - each folder is create-react-app application.
- React is not opinionated, there isn't a prevailing best practice.
    - lab apps follow some established patterns (src/components) and components encapsulated into files/folders
    - redux does have some guidelines
    - recommend putting tests in same directory (easier to "include" and find.)
        - webpack helps enable this by not bundling tests.

### React website
- javascript *library* (only V in MVC - HTML/DOM)

#### JSX
- javascript extension, looks similar to HTML
- HTML -like syntax compiles to Javascript function calls (Babel)

- function accepts "props"
- JSX transpiles to a more JS-like function. HTML -like syntax is just for ease of development
- upper vs. lower case is used to distinguish between HTML tags vs. React components

    function Hello(...) {
        return (
            <div>
                <SomeComponent />
            ...
        )
    }

- JSX is superset of Javascript (_almost_ "just javascript")
    - "for" is a reserved keyword, use htmlFor
    - "class", use className

- Expression bindings   
    - embeds javascript, uses curly braces {} (ex. {props.name} references props.name)
    - can use props.children (output elements.)
    - callbacks ex. onClick={props.onClick} where props.onClick is a function.

- props.items.map(item => <li key...>)
    - iterate over items in an array


#### Virtual DOM
- Copy of browser DOM. 
    - React compares to existing rendered DOM and re-renders (efficiency)

#### Components
- encapsulate unit of functionality
- reusable.

- functional component
    - javascript function
    - doesn't hold any state: takes input and returns output.
        - "props" as input.
    
- ReactDOM is rendering engine for React (can use alternates.)
    
    function Hello(props) {..}
    ...
    ReactDOM.render(<Hello name="Tim"> ...);
    // name is available in "props"

- class component
    - extends React.Component
    - has "render" method
    - can have state. (ex. toggle)

    class Hello extends React.Component {
        render() {
            return <h1>Hello {this.props.name}</h1>;
        }
    }
    ...
    ReactDOM.render(<Hello name="Tim"> ...);

- Component "spec"
    - render (required)
        - null or false will render nothing (ex. empty item in a list)
        - does not mutate component state.
        - "pure" given inputs, always returns outputs.
        - should not read/write to DOM.
    - constructor
        - receives props when component is created.
        - initialize state
        - call super(props)
    - lifecycle methods
        - mounting - instance of component is created and inserted into DOM
            - called in order: constructor / render / componentDidMount
        - updating - changes to props or state
            - shouldComponentUpdate
                - limit component updates (for performance.)
            - render
            - componentDidUpdate
        - unmounting - component will be removed from the DOM
            - componentWillUnmount 
    - properties
        - props
            - object defined by user (caller) of component
            - props.children (special) can be use to get props as children (render children as components.)
                - pass react components to anothe react component.
        - defaultProps (static)
            - for when user doesn't provide prop (fallback case.)
            - this can be used with functional component as well.
        - propTypes (static)
            - allows validation of props.
            - "a component's API"
            - defines expected props / types of those props / required -ness
            - **recommend doing this.
    - state/setState()
        - data needed for a component (only for class-based.)
        - don't mutate directly, use setState()
            - constructor doesn't use setState, it is just initialization.
        - setState
            - batches state changes (setting state directly would bypass this.)

#### Test Helpers

- Enzyme
    - from Airbnb, makes testing components easier.
    - shallow (like unit test)
        - renders component one level deep.

        element = shallow(
            <EmployeeForm employee={employee}
                errors={errors}
                ... />
        )

        - returns an object

        expect(shallow(...)).toHaveLength(1);

    - mount (more like integration test)
        - renders component and all children
    - jest expect() has matchers.
        - jest expect API
        - toEqual, etc...
        - toIncludeText('hi')
        - toContainReact(jsx)
            - assert that a specified react component is present.
        - toHaveProp(propName, value)
    - DOM query
        - component.find
    - jest has test runner (*test.js and *spec.js) run on "yarn test"