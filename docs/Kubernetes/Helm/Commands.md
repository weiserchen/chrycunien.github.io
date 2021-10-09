# Commands

This file lists some common commands, for more information, append `-h` after each command.

## Basics
```bash
# Search for helm charm in the Artifact Hub
$ helm search hub [KEYWORD]

# Search through all repository configured on the system
$ helm search repo [KEYWORD]

# Retrieve a package from a package repository, and download it locally.
$ helm pull [CHART]

# Deploy a chart instance
$ helm install [NAME] [CHART]

# Upgrade a release of a chart 
$ helm upgrade [RELEASE] [CHART]

# Rollback to a previous version
$ helm rollback [RELEASE] [REVISON]

# Remove the release of a chart
$ helm uninstall [RELEASE]
```

## Repo Management
```bash
# Add a chart repository
$ helm repo add [NAME] [URL]

# List chart repositories
$ helm repo list

# Remove a chart repository
$ helm repo remove [NAME]

# Get the latest information of a repository.
# The result if cached locally and then used by commands like `helm search`
$ helm repo update

# Read the current directory and generate an index file based on the charts found.
$ helm repo index [DIR]
```

## Release Management
```bash
# Display the detail of a release
$ helm status [RELEASE]

# List all release in a specific namespace
$ helm list

# History prints historical revisions for a given release.
$ helm history [RELEASE]

# This command fetches the generated manifest files for a given release.
$ helm get manifest [RELEASE]
```

## Chart Management
```bash
# Creates a chart directory along with the common files and directories used in a chart.
$ helm create [NAME]

# Render chart templates locally and display the output.
$ helm template [NAME] [CHART]

# Packages a chart into a versioned chart archive file.
$ helm package [CHART]

# Takes a path to a chart and runs a series of tests to verify that the chart is well-formed.
$ helm lint [CHART]
```

## References
- https://cloudacademy.com/course/introduction-to-helm-1034
