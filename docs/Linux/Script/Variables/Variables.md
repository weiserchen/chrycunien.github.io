# Variables

There are two ways to set an variables in bash: shell variable and environment variable.

- shell variable: variables for the current chell, usually store temporary variable or condition (if, for) variables.
- environment variable: this variable will pass values to all its child.

```bash
# Note: "" will expand variables and '' will not.

# Set shell variable
USER_NAME='Eric'

# Set environment variable
export USER_NAME
export TEST_NAME='Mike'
```

## Display variables
```bash
USER_NAME='Eric'

# OR `echo "$USER_NAME"`
echo "${USER_NAME}"
echo "The username is ${USER_NAME}."
```

## Full script
```bash
#!/bin/bash

# This script displays various information to the screen.

# Display 'Hello'
echo 'Hello'

# Assign a value to a variable.
WORD='script'

# Display that value using the variable.
echo "$WORD"

# Demonstrate that single quotes cause variables to not get expanded.
echo '$WORD'

# Combine the variable with hard-coded text.
echo "This is a shell $WORD"

# Display the contents of the variable using an alternative syntax.
echo "This is a shell ${WORD}"

# Append text to the variable.
echo "${WORD}ing is fun!"

# Show how NOT to append text to a variable.
# This doesn't work:
echo "$WORDing is fun!"

# Create a new variable
ENDING='ed'

# Combine the two variables.
echo "This is ${WORD}${ENDING}."

# Change the value stored in the ENDING variable.  (Reassignment.)
ENDING='ing'
echo "${WORD}${ENDING} is fun!"

# Reassign value to ENDING.
ENDING='s'
echo "You are going to write many ${WORD}${ENDING} in this class!"
```

## References
- https://www.baeldung.com/linux/bash-variables-export
- https://cloudacademy.com/course/shell-scripting-user-account-creation-1517/
