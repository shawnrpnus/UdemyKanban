# Spring Boot

## Dependencies

1. Spring Boot Starter Data JPA
2. Spring Boot Starter Web
3. Spring Boot DevTools
4. H2 Database
5. MySQL
6. Project Lombok
7. Spring Boot Starter Test

## Setup

1. Create a models package to hold entity classes
2. Create an exceptions package to hold exceptions
   - Create a global exception handler annotated with @ControllerAdvice and @RestController
   - Create the exception class (extends RuntimeException) which has a message in its constructor
   - Create the exception wrapper (a POJO class that has attributes corresponding to the attributes of the entity in which validation errors were found) --> The error message will be assigned to this attribute in the exception handler
3. Create a repositories package to hold repositories (DAO layer - responsible for CRUD operations on entities)
4. Create a services package to hold services (@Service - this is where business logic, error handling etc. will be written)
   - Examples: Project Service, Validation Service
5. Create a controller package @RestController.
   - Define the request mapping url
   - Write methods and define their endpoint urls with @PostMapping, @GetMapping("/urlhere")

# React

## Dependencies

1. Typescript
2. antd
3. moment
4. react-router-dom
5. redux
6. react-redux
7. redux-thunk
8. axios

## Setup

1. Use create-react-app to create a new react project --typescript
2. Create a components folder to house the components
   - Split components into use cases / entities
   - Have a layout folder for general components such as header, sidebar
3. Setup router in App.tsx
4. Use functional components for small-scale stateless components e.g. buttons
5. Implement form controls for forms: follow same attribute names as entity in backend

## Redux

### Architecture and Workflow

1. Form --> Dispatch a Redux action --> redux action calls API from Spring Boot --> errors put in Redux store --> component gets update from store to display errors (mapStateToProps)

### Setup

1. Create a store.ts in src folder
2. Create a root reducer in src/reducers using combineReducers
3. Set up thunk middleware, use createStore to create the store with rootReducer, initialState, middleware (Thunk) and enhancers (DevTools)
4. Wrap entire App in Provider component, pass in the store as props
5. Create src/actions folder with two files: projectActions (for action creators) and types (for const action types)
6. Define action creators (ordinary / async)
7. Define mapStateToProps and mapDispatchToProps in components, then connect component and export
8. Map form errors in state (put there by action creator & reducer) to component props --> render error messages in the form
