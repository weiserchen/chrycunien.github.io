# Contributing

We will introduce several steps to contributing to apache submarine project.

1. Fork `https://github.com/apache/submarine` to your own repositories.
2. Clone the submarine project to your local machine.
```bash
# Step 1. Clone the repository
git clone git@github.com:${USERNAME}/submarine.git

# Step 2. Add apache/submarine as remote upstream
cd submarine
git remote add upstream git@github.com:apache/submarine.git

# Step 3. Don't push to the upstream master.
git remote set-url --push upstream no_push

# Step 4. Check your remote settings.
git remote -v
```
3. Create a new Jira issue
4. Create a new local branch of the submarine project.
```bash
# Step 0. Change to submarine directory
cd submarine

# Step 1. Make your local master up-to-date
# On master branch
git checkout master
git fetch upstream
git rebase upstream/master

# Step 2. Create a new branch fro issue SUBMARINE-${jira_number}
# Example: git checkout -b SUBMARINE-748
git checkout -b SUBMARINE-${jira_number} 
```
5. You add or remove some codes and then make some commits.
```bash
# Step 1. Add the modified files to stage area.
git add ${edited files}

# Step 2. Commit. 
# Notice the commit message format: "SUBMARINE-${jira_number}. ${Commit Message}"
# Example: git commit -m "SUBMARINE-748. Update Contributing guide"
git commit -m "SUBMARINE-${jira_number}. ${Commit Message}"
```
6. Fetch the master again to make your no conflicts between the master and your branch.
```bash
# On SUBMARINE-${jira_number} branch
git fetch upstream
git rebase upstream/master
```
7. Push your local branch to your own repository.
```bash
git push origin SUBMARINE-${jira_number}
```
8. Create a pull request.
    - Visit `https://github.com/apache/submarine`. 
    - Click the `Compare & Pull Request` button. 
    - You will see a template, then fill in proper description.
9. Code review process.
    - Check the state of your pull request in your free time.
    - If found failed tests, fix it and push again. You need not to create a new PR, the github will handle it for you.
    - Some reviewers will review your code and give recommendations.
    - If many reviews consider the PR is fine, then it will be merged later.

