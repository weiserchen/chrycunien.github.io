# Components

## Core
The core files are the top-level files in the server-core folder.

### BootStrap
- `Bootstrap` extends `HttpServlet`:
    - It first registers the api info like description, email, version, ...
    - The create a server and config
    - And finally use the config to create a servlet

### Submitter
- !!! UNFINISHED
- Submitter Manager is responsible for load implements class.
- Submitter is used to actually to create resources (I believe it is to create a kubernetes resources)

### Server
- It first loads a `SubmarineConfiguration` instance, which is a singleton
- Then it add config to `jettyWebServer` and set up handlers for `jettyWebServer`
- Last, it starts notebook server and submarine server
- It registers a shutdown hook
```java
Runtime.getRuntime()
        .addShutdownHook(
            new Thread(
                () -> {
                  LOG.info("Shutting down Submarine Server ... ");
                  try {
                    jettyWebServer.stop();
                    Thread.sleep(3000);
                  } catch (Exception e) {
                    LOG.error("Error while stopping servlet container", e);
                  }
                  LOG.info("Bye");
                }));
```

## Database

### Entity
- abstract class `BaseEntity`
- It is just a base class for databast schema.
- It also implement a customized `toString()` function.

### Utils
- `ModelBatisUtil`:
    - In initialization, it sets up a `sqlSessionFactory` with the `mlflow` database configuration
- `MyBatisUtil`:
    - In initialization, it sets up a `sqlSessionFactory` with our own configuration.
    - For example, you can specify `Test` and it will use test database instead.
- Note:
    - `SubmarineConfiguration.getInstance()` is a singleton factory, every method that call it will result in the change of the state.

## Environment

### Database/Entity
- class `EnvironmentEntity` extends `BaseEntity`
- It adds `environmentName` and `environmentSpec` fields as well as getters and setters

### Database/Mapper
- interface `EnvironmentMapper`
- It provides a interface for  `EnvironmentEntity`'s CRUD operations

### EnvironmentManager
- fields
    - `cachedEnvironments`: cache for environments
- static method:
    - `getInstance()`: a singleton factory
- instance method:
    - `checkSpec(EnvironmentSpec spec)`:
        - Make sure that the `EnvironmentSpec` is not `null`
        - And return `SubmarineRuntimeException` with `BAD_REQUEST` status code
    - `generateEnvironmentId()`:
        - A method to get incremental environment id
    - `getEnvironmentDetails(String name)`:
        - Get an environment from the cache first
        - If not found in the cache, try to pull an entity from the database through `sqlSession`
        - If not found in the database, throw a `SubmarineRuntimeException` with `BAD_REQUEST` status code
    - `listEnvironments(String status)`:
        - Get a list of environments
        - Get all `EnvironmentEntity` from the database and then tranform it into `Environment` and put into the list and cache
        - If some error happens, throw a `SubmarineRuntimeException` with `BAD_REQUEST` status code
        - Set the `readedDB` to false (which means we already build the cache)
    - `getEnvironment(String name)`:
        - A wrapper of `getEnvironmentDetails(String name)`
    - `deleteEnvironment(String name)`:
        - First `getEnvironment(String name)`. If not found, throw a `SubmarineRuntimeException` with `NOT_FOUND` status code.
        - Remove the environment from the database and the cache, else throw a `SubmarineRuntimeException` with `BAD_REQUEST` status code
    - `updateEnvironment(String name, EnvironmentSpec spec)`:
        - A wrapper of `createOrUpdateEnvironment(EnvironmentSpec spec, String operation)`
        - Call `checkSpec(EnvironmentSpec spec)` to make sure the spec is not `null`
        - If not found, throw a `SubmarineRuntimeException` with `NOT_FOUND` status code.
    - `createEnvironment(String name, EnvironmentSpec spec)`:
        - A wrapper of `createOrUpdateEnvironment(EnvironmentSpec spec, String operation)`
        - Call `checkSpec(EnvironmentSpec spec)` to make sure the spec is not `null`
    - `createOrUpdateEnvironment(EnvironmentSpec spec, String operation)`:
        - Create an entity based on the given spec
        - Choose to create or update given the argument
        - And then update the cache accordingly
        - If there're some error, throw a `SubmarineRuntimeException` with `BAD_REQUEST` status code
    
## Experiment

### Database/Entity
- class `ExperimentEntity` extends `BaseEntity`
- It adds `experimentSpec` fields as well as getters and setters

### Database/Mappers
- interface `ExperimentMapper`
- It provides a interface for  `EnvironmentEntity`'s CRUD operations

### Database/Service
- class `Experiment `
- It provides a service that implement `ExperimentMapper` (but not use `implement`, so what it do is to create a deleaged service)
- Each method will return true to signal the result of execution

### Experiment Manager
- `createExperiment(ExperimentSpec spec)`:
    - If first check the spec is `null` or not by calling `checkSpec(spec)`
    - Then it is populate the `spec` using some default fields.
    - The spec is used to create an experiment
    - After creation, 

## ExperimentTemplate

### Entities
- extends `BaseEntity`
- add `experimentTemplateName` and `experimentTemplateSpec`

### Mappers
- Just like other mappers before
- but it add a special `selectByKey`

### ExperimentTemplateManager
- This manager handles a lot of creating, setting of parameters
- Then it usuallty returns a `ExperimentSpec` or `ExperimentTemplateSpec`

## model.database

### Entities
- `ModelVersionEntity`:
    - `name`, `version`, `userId`, `currentStage`, `runId`, `status`, ...
    - getters, setters, and `toString()`
- `RegisteredModelNameEntity`:
    - `name`, `description`, ...
    - getters, setters, and `toString()`

### Mappers
- The mappers for model entities

### Service
- They are wrappers for `insert`, `delete`, `select`, ...

## Notebook

### Entity
- extends `BaseEntity`
- And add `notebookSpec`

### Mappers
- Mapper interface for notebook entity

### Service
- A service to insert, delete, update a notebook

### NotebookManager
- Manager is a class that help to convert a spec to a notebook
- It uses notebook service under the hood
- It also does some validation, cleaning, adding, and other things to let the spec become valid


## Response
- It contains several class to build a json response.

## Rest
- 

## gson
- This folder defines several serializer/deserializer used by google gson (json tool).

## utils
- This folder have files to support git operations.

### GitUtils
- `clone(String remotePath, String localPath, String token, String branch)`:
    - Perform `git clone` operation
    - It uses github access token to clone the repo.
    - And it will also create a repository and switch to a given branch
- `add(String localPath, String fileName)`:
    - Perform `git add` operation
    - It first makes sure the file exists
    - And then add to the cache
- `rm(String localPath, String fileName)`:
    - Perform `git rm` operation
- `reset(String localPath, String fileName)`:
    - Perform `git reset` operation
- `pull(String localPath, String token, String branch)`:
    - Perform `git pull` operation
- `commit(String localPath, String message)`:
    - Perform `git commit` operation
- `push(String localPath, String token, String remote)`:
    - Perform `git push` operation
- `branchCreate(String localPath, String branchName)`:
    - Perform `git branch` operation
    - It will check if the branch has already existed
- `branchDelete(String localPath, String branchName)`:
    - Perform `git branch -d` operation
- `checkout(String localPath, String branchName)`:
    - Perform `git checkout` operation
- `rebase(String localPath, String branchName, String upstreamName)`
    - Perfrom `git rebase` operation
- `remoteAdd(String localPath, String uri, String remoteName)`:
    - Perfrom `git remote add` operation

### GitHttpRequest
- This class helps sends an HTTP request to the specified URL
- `GitHttpRequest`:
    - Create an `URLConnection` and then cast to `HttpURLConnection`
    - Then set request methods and header properties
    - At last, write content to output stream and read the result from input stream



## References
- https://github.com/apache/submarine/tree/master/submarine-server/server-core/src/main/java/org/apache/submarine/server