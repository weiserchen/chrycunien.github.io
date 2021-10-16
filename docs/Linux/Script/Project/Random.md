# Generate Random Password

## RANDOM varaible
- There is a `RANDOM` environment variable in the shell.
- Use `man bash` and search for `RANDOM`.
- It will generate a number between 0 and 32767 each time.
```bash
$ echo "${RANDOM}"
```

## Date command
- Use `date` as a source of randomness.
- We we some format in `date` to generate a number.
- `%s`: seconds since 1970-01-01 00:00:00 UTC (unix time or epoch time)
- `%N`: nanoseconds (000000000..999999999)
- Use `man date` for more information.
```bash
# You will get a random number showed in the following lines
$ echo "$(date +%s%N)"
# Result:
# 1633418761738268201
```

## Cryptographic checksum
- Use cryptographic checksum ensure the integrity of your content.
- There are several variations: `sha1sum`, `sha256sum`, ...
- In some systems, there is a general `shasum` command you can use.
- You can find a list of checksum utilities by this command: `ls -l /usr/bin/*sum`
- `head`: output the first part of a file. 
- `-c` stands for characters
- See `man head` for more information.
```bash
$ echo "$(date +%s%N | sha256sum | head -c32)"
```

## Special Character
- `fold` command fold each input line to fit in specified width (because if it's hard to see if a line is too long)
    - `-w1`: each line only contains 1 character
    - `man fold` for more information
- `shuf`: generate random permutations of the input lines
    -  `man shuf` for more information
```bash
# Select a random special character in a set
$ echo "$(echo '!@#$%^&*()_-+=' | fold -w1 | shuf | head -c1)"
```

## Full Script
```bash
#!/bin/bash

# This script generates a list of random passwords.

# A random number as a password.
PASSWORD="${RANDOM}"
echo "${PASSWORD}"

# Three random numbers together.
PASSWORD="${RANDOM}${RANDOM}${RANDOM}"
echo "${PASSWORD}"

# Use the current date/time as the basis for the password.
PASSWORD=$(date +%s)
echo "${PASSWORD}"

# Use nanoseconds to act as randomization.
PASSWORD=$(date +%s%N)
echo "${PASSWORD}"

# A better password.
PASSWORD=$(date +%s%N | sha256sum | head -c32)
echo "${PASSWORD}"

# An even better password.
PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c48)
echo "${PASSWORD}"

# Append a special character to the password.
SPECIAL_CHARACTER=$(echo '!@#$%^&*()_-+=' | fold -w1 | shuf | head -c1)
echo "${PASSWORD}${SPECIAL_CHARACTER}"
```

## References
- https://cloudacademy.com/course/password-generation-shell-script-arguments-1518