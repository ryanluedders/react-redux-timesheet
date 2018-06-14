# React Training

Object Partners
Dustin Schau

## Intro to Javascript
- Node.js/server side js

### Basics
- Variable Declaration -
    
        var xyz = ...

- instead use (as of ES2015) : 
    
        let xyz = ... 
        const xyz = ...

- "let" is block scoped

#### Types
- Symbols - enforce constants (ex. Key in a map) cannot be reassigned or reinitialized
- Object: c

        const o = {}

- Array: 
        
        const o = [...]

- Comments - 

        // or /* .. */

- Comparisons -
    - === (triple equals) strict equality - does not coerce types like abstract equality (==)
    - prefer strict equality.
    - be careful because all operators apply type coercion.
- Conditional -

        let x = a || b

- Functions -

        function xyz() {..}
        const f = function(x) { .. }
        const f = arg => ...

- Dont Do This: 

        const f = new Function("", ...")
    
- compiler doesn't prevent calling with a different number of arguments. Typescript can provide this compile time validation

### ES2015 (ES6)
- All labs use ES2015 features
- ECMAScript is Javascript, releases in yearly iterations.

- export -
    - one place:
        
            export const f = () => "bar"

    - another place:
        
            import {f} from "./f"

    - webpack allows for this
    - allows modularization

- let/const -
    - block scoped.
    - const cannot be reassigned.
    - **prefer const unless explicity needing to reassign or mutate

- class -
    - syntactic sugar for JS prototype

            ex. var Animal = function () {
                ..
            }

            // vs.

            class Animal {
                constructor(...) {

                }
            }

- arrow function -
    - doesn't create a new "this"

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

- template strings -
    - multi-line strings, variable replacement (uses backticks)

            const multilineStr = `I am
            a
            multiline string`

            const varReplacement = `${multilineStr} additional content`

- destructuring -

        const { hello, other, another } = obj (pulls properties from obj, names match keys)

- rest/spread

        arr = ['a', 'b', 'c']
        const [a, ...rest] = arr (a = 'a', rest = ['b', 'c']) naming doesn't matter here

    - spread:

            const nums = [10, 20, 30];

- default arguments:

        function greet(name, greeting = "Hello") -- "Hello" is default
        greet("world");
        greet("world", "hallo")

- resources:
    - MDN - mozilla developer network
        - clearer docs, more accurate

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
        - create-react-app defines this.

### State
- components internally stored state, used for behavior of component
- use onChange to update state

        <input ... value={this.state.name} onChange={this.handleChange} .. />

        handleChange(ev) {
            const name = ev.target.value;
            this.setState({
                name
            })
        }

- initialize state in constructor
- use setState()
    - this.state.name = ... : code may/will work, but easier to introduce bugs and doesn't allow React to batch.
- lifting state up (sharing state upwards, ex. name field on form component.)
    - as part of component expose something like an api to allow parents to be notified of change
    - handleChange() {} of component has a hook, calls another method which the parent can provide.
- state updates may be async (might be batched.)
- to compute next state, use function:
    
        // do this
        this.setState(prevState => ({
            counter: prevState.counter + 1
        }))    

        // not this
        this.setState({
            this.counter += 1;
        })

- state updates are merged with existing state

### Routing
- backend not serving pages, application handles URL's.
- utilizes JS location & history API to transition.

#### React Router
- tracks routes, maintains browser history
- Route is represented as React component.
- Routes utilize props to provide information

- memory router - simulate router in tests
- browser router

##### Route
- maps path -> component
- paths
    - paths are based on express style ex. /employees/:id
    - if path is not defined for a route, then it will _always_ render
    - component
    - exact (strict on top of exact ex. trailing slash)
- redirect - navigates to new location
- components can redirect (ex. if not logged in)
- switch - for when you want a single route, goes through and renders the first match
- links reference routes
- router providing data to components: where we are, where we were, and where we are going
    - match: path, url, params, isExact
    - location: where is the app at currently

### Demo of create-react-app and additional interesting notes
- yarn add normalize.css - remove margins
- every dependency has a cost 
    - page load times
    - time spent processing javascript/css
- flexbox: fixed header, fixed footer and scrollable content
- React vs. Angular, Angular has more boilerplate and different patterns, React is more "like javascript."
    - [writing React will make you a better JS developer, writing Angular will make you a better Angular developer.]

## React Day 2

- Gatsby - write React components and then generate static HTML
    - React becomes templating engine

### Redux
- single source of truth
- state is read only - changed by dispatching actions
    - changes occur via (pure functions) reducers
        - pure function: given input, outputs are always the same.
- predictable, changes can be recorded, replayed
- centralization
    - avoid race conditions
    - centralize some concerns - logging, undo/redo, persistence
- Action

        Action {
            type : // recommend Flux Standard Actions
            ... anything else
        }

- Reducer

        function reducer(state = initialState, action) {
                switch(action.type) {
                    case 'XYZ':
                        // return new object merging content of previous
                        // state with the latest change.
                        // {} creates new object - don't mutate the existing state
                        return Object.assign({}, state, {...})
                    ...
                }
            }

- store 
    - from redux library: createStore(reducer)
    - API: getState(), dispatch(action), subscribe(listener)
- unidirectional data flow
- middleware
    - intercept action after being dispatched, but before it gets to the reducer
    - can inspect actions and state
    - middleware = store => next => action

            //ex. logger

            const logger = store => next => action => {
                console.log(..);
                let result = next(action);
                console.log(..);
                return result;
            }

- in case of multiple reducers: combineReducers(...)
- async actions: want to know
    - when the call starts
    - when the call succeeds
    - when the call fails
    - actions notify reducers of these events.

            { type : 'FETCH_AGENTS_REQUEST' }
            { type : 'FETCH_AGENTS_FAIL' error: 'xyz' }
            { type : 'FETCH_AGENTS_SUCCESS' response: {} }

- async action creators
    - standard way is react-thunk middleware

            export const fetchAgents = () => {
                return dispatch => {
                    dispatch(requestAgents())
                    return axios.get('api/agents')
                        .then(response => response.data)
                        .then(agents => dispatch(requestAgentsSuccess(agents)))
                        .catch(error => dispatch(requestAgentsError(error)))
                }
            }

- React redux - special redux specifically for react
    - easier binding to react components

- presentational components
    - don't care about redux/ no state/ get data from props
    - implemented as functional/stateless components
- container (smart) components
    - bridge between react and redux
    - react redux connect() function
        - mapStateToProps - gets data out of state
        - mapDispatchToProps
    - ex. List binding to state, list items getting data via props

### React Forms
- Out of box, maybe Angular does forms better
    - many plugins/extensions available to make React on-par (or better) compared to Angular
- Form components with event listeners
    - callbacks on onChange prop
        - onChange behavior is based on type of input field
- controlled components
    - set value, take control of what is displayed. control is achieved onChange listener
- react bootstrap (foundation or material UI would be alternatives.)
- validation
    - add validationState function, returns "success" "warning" or "error"
        - add FormControl.Feedback component to show this feedback

                isFieldValid() {
                    if (!this.state) return;
                    if (this.state.firstName.valid === true) return 'success';
                    ...
                }

- uncontrolled components (useful for non-react components)
    - ref prop provides access to underlying html component

#### Other Libraries
- Formik - form handling, simplifies normally complex operations
    - validation, async submit
    - code is typically cleaner and easier to understand.
    - ex. touched (for validation), error handling, handleChange, etc..
- React Final Form
    - more lightweight

### Object operations
- array extras methods
- prefer map/filter/reduce over foreach
    - side effects exist with forEach?
- others: sum, find

- presentation / written in React with "spectacle" library.

### Special Topics
- React.Fragment
- static typing for JS
    - flow (from FB) like propTypes, but provides errors at compile time
        - nice to get IDE support, IDE knows properties on types
        - supported out of the box by create-react-app
            - use comment //@flow to activate this
                - can gradually adopt
    - TypeScript
        - create-react-app can use --scripts-version to get custom version of react-scripts with ts
        - typescript is superset of javascript
- css in js
    - css modules - solves "global" problem with CSS.
        - imports CSS rules (via webpack/ and tools) and makes them specific to component
    - favorite css in js is "emotion"
    - styled-components is #1 by far.
- redux tools/alternatives
    - redux-saga, added as middleware, run the saga, listens for actions
        - easy to test (redux-saga-test-plan)
    - others redux-promise, redux-api-middleware, redux-async, redux-observable

#### React Patterns
- terms (lots)
- higher-order component - takes component instance and returns new component

        // ex. comment list
        withComments(Component) {
            // instantiates components, inject whatever you want into passed-in component
        }

    - why? separation of concerns. some components are pure functional, others get/inject data
- render props
    - prop is a function, invoke function with arguments
    - people using this over higher order components

#### Best Practices
- use create-react-app & don't eject.
    - break in dependency would be noticed by _everyone_, good ecosystem
    - most reasons for ejecting: css preprocessor
        - forking react-scripts can maybe avoid this?
        - recommendation: don't use sass or less
- write e2e tests, integration tests, unit tests
    - testing works out of box w/ create-react-app
    - integration tests - 2-3 things together
    - end to end tests: cypress, nightwatch, selenium
- ship minimal payloads to users (ship less JS to users.)
    - be selective about libraries
        - small libraries, libraries for specific purpose
    - react-loadable - load different routes on demand
        - uses code splitting.
    - can make this part of build pipeline (reject build if size gets too big?)
        - ideal from google performance analysis is 200kb (hard to hit.)
- redux doesn't have to handle everything
    - only things that matter globally to the app
    - ex. form toggle, likely only that form cares about the field (not a global concern,) should probably not be in redux.
- leverage babel ecosystem
    - getting new JS features
    - async/await - write js as if it was synchronous
        - looks kind of similar to blocking java code
- HTTP
    - axios or fetch
        - axios wraps fetch/response.json promise complexity
        - pretty comparable
- React native
    - can target alternate platforms
        - ex. ios/android
    - react-dom / instead use react-native
    - actually instantiates native components
    - use create-react-native-app
- JSX/Abstraction
    - looks like HTML, but can be swapped out for other platforms
        - ex. react-native, silly console example.

#### Deployment
- think about deploying during pipeline
- have jenkins run yarn/yarn test, etc... in Jenkinsfile?
    - docker images for > node:8 includes yarn
- deploy a WAR file
    - use existing build tool
    - build static content and place into some directory to bundle into war file
        - gradle has a plugin to support this
    - make sure to set caching headers for static content
        - spring by default sets 'no-cache'

- react router
    - use authentication state in redux and don't show routes
        - react router docs have section on creating secured routes
    - code splitting might help with this?

#### Formik Demo
- "Yup" library for form validation
    - use validation schema to validate form
        - kind of like PropTypes
