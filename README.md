# Building and Testing Business Service

This document describes how to set up your development environment to contribute to the swyp business backend service.
It also explains the basic mechanics of using `git`, `node`, and `npm`.

* [Prerequisite Software](#prerequisite-software)
* [Getting the Sources](#getting-the-sources)
* [Installing NPM Modules](#installing-npm-modules)
* [Building](#building)
* [Running Tests Locally](#running-tests-locally)


## Prerequisite Software

Before you can contribute to the application, you must install and configure the
following products on your development machine:

* [Git](http://git-scm.com).

* [Node.js](http://nodejs.org), (version specified in the engines field of [`package.json`](../package.json)) which is used to run a development web server,
  run tests, and generate distributable files.

* [Yarn](https://yarnpkg.com) (version specified in the engines field of [`package.json`](../package.json)) which is used to install dependencies.


## Getting the Sources

Fork and clone the application repository:

1. Login to your bitbucket account and fork the application
3. Clone your fork of the application repository and define an `upstream` remote pointing back to
   the application repository that you forked.

```shell
# Clone your GitHub repository:
git clone git@bitbucket.org:oracka/business-backend-service.git

# Go to the appplication directory:
cd business-backend-service

# Add the main  repository as an upstream remote to your repository:
git remote add upstream git@bitbucket.org:oracka/business-backend-service.git
```
## Installing NPM Modules

Next, install the JavaScript modules needed to build and test the application:

```shell
# Install application project dependencies (package.json)
yarn install
```
## Submitting a Pull Request (PR)
Before you submit your Pull Request (PR) consider the following guidelines:

1. Make your changes in a new git branch:

     ```shell
     git checkout develop
     git checkout -b new-feature-name-goes-here develop
     ```

2. Code the functionality or create your patch, **including appropriate test cases**.
3. Follow our [Coding Rules](#rules).
4. Run the full test suite, as described in the [Test Rules](#test), and ensure that all tests pass.
5. Commit your changes using a descriptive commit message that follows our
  [commit message conventions](#commit). Adherence to these conventions
  is necessary because release notes are automatically generated from these messages.

     ```shell
     npm run commit
     ```

6. Push your branch to Bitbucket:

    ```shell
    git push origin 
    ```

7. In GitHub, send a pull request to `business-backend-service:develop`.
* If we suggest changes then:
  * Make the required updates.
  * Re-run the whole test suites to ensure tests are still passing.
  * Rebase your branch and force push to your bitbucket repository (this will update your Pull Request):

    ```shell
    git rebase develop -i
    git push -f
    ```

That's it! Thank you for your contribution!

#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes
from the main (upstream) repository:

* Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

    ```shell
    git push origin --delete new-feature-name-goes-here
    ```

* Check out the develop branch:

    ```shell
    git checkout develop -f
    ```

* Delete the local branch:

    ```shell
    git branch -D new-feature-name-goes-here
    ```

* Update your develop with the latest upstream version:

    ```shell
    git pull --ff upstream develop
    ```

## Coding Rules
To ensure consistency throughout the source code, keep these rules in mind as you are working:

* All features or bug fixes **must be tested** by one or more specs (unit-tests).
* All public API methods **must be documented**. (Details TBC).
* We follow [AirBnb](https://github.com/airbnb/javascript), but wrap all code at
  **100 characters**. An automated formatter is available, see
  [DEVELOPER.md](docs/DEVELOPER.md#clang-format).

## Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted.  This leads to **more
readable messages** that are easy to follow when looking through the **project history**.  But also,
we use the git commit messages to **generate the application change log**.

### Commit Message Format
Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

The footer should contain a [closing reference to an issue](https://help.github.com/articles/closing-issues-via-commit-messages/) if any.

Samples: (even more [samples](https://github.com/angular/angular/commits/master))

```
docs(changelog): update changelog to beta.5
```
```
fix(release): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

### Revert
If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type
Must be one of the following:

* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **test**: Adding missing tests or correcting existing tests

### Scope
The scope should be the name of the files/folders affected (as perceived by the person reading the changelog generated from commit messages.


There are currently a few exceptions to the rule:
* **changelog**: used for updating the release notes in CHANGELOG.md
* none/empty string: useful for `style`, `test` and `refactor` changes that are done across all packages (e.g. `style: add missing semicolons`)

### Subject
The subject contains a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* no dot (.) at the end

### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer
The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

A detailed explanation can be found in this [document][commit-message-format].

## Editor Setup
Before editing or adding new code to the code base ensure that your ide or editor of choose has the following installed and enabled.
* tslint

## Building

To build application run:

```shell
$ npm run build
```

* Results are put in the dist folder.

## Running Tests Locally

To run tests:

```shell
$ npm run test or             # Run all application tests on node
$ npm run watch-test         # Run test each time a file is updated

```

You should execute the 3 test suites before submitting a PR to github.


All the tests are executed on our Continuous Integration infrastructure and a PR could only be merged once the tests pass.

- CircleCI fails if your code is not formatted properly,
- Travis CI fails if any of the test suites described above fails.

## Formatting your source code

The Application uses eslint to format the source code. If the source code
is not properly formatted, the CI will fail and the PR can not be merged.

You can automatically check your code by for format error by running:

``` shell
$ npm run format
```

## Linting/verifying your source code

You can check that your code is properly formatted and adheres to coding style by running:

``` shell
$ npm run watch-debug
```


## Understanding Trello Pipelines
* New Issues: New issues (in user story format) land here automatically. They are to be dragged to another pipeline as soon as possible.

* Project backlog: Issues that are about to receive attention (Only project owner moves issues to the pipeline) Issues here are to be estimated by the developer designated to work on it. Once it has been estimated it is ready to be added to the strint backlog pipeline.

* String Backlog: Issues here have been estimated and are part of a milestone to be delivered in at the end of the next sprint circle.

* In progress: List of all task that has been started for the current sprint circle.
* Ready for QA: All test here are ready to be tested.
* Done: All Issues here have been merged to develop branch and ready to be shipped.
* Closed: Issues here are either complete or are not going to be done.
* Icebox: Issues here have no immediate value for the app or the priority level is very low

## Understanding Trello Board Labels
* Red label = Bug.
* Yellow label = Design work.
* Pink label = Engineering.
* Purple Label = Help needed.
* Blue Label = Front end work.
* Green Label = Discussion.
* Brown Label = Feature.
