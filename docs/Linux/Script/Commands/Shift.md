# Shift

This is a special command. This command rename the positional arguments $N+1,$N+2 ... to $1,$2 ... .
- `shift [n]`

## Example
In this exxample, in each iteration you will shift once, just like a roller, for `n` arguments you have to roll `n` times.
- This can be useful if you want to do some batch processing. (Each construction need more than 1 argument, like name, age, height, ...)
```bash
while [[ "${#}" -gt 0 ]]
do
  echo "Number of parameters: ${#}"
  echo "Parameter 1: ${1}"
  echo "Parameter 2: ${2}"
  echo "Parameter 3: ${3}"
  echo
  shift
done
```