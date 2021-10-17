# YAML

- A data serialization language.
- Human-friendly and can work with differenct progarmming languages.
- Whitespace sensitive, but more readable.
- With `.yaml` or `yml` file extension.
- Is a super set of `json`.
- Support inline commment (using `#`)

## Syntaxs

### Data Types
- Integer: `0`, `1`, `+1`, `-1`
- Strings
    - `Normal String`
    - `'#:!'` for special characters
    - `"\n"` for escape characters
- Null: `null` or `~`
- Booleans
    - `true`, `false`
    - `yes`, `no`
    - `on`, `off`
    - use `'yes'` if you want to string representation

### Collections
- Mappings
```yaml
# Mapping
key: value

# Nested Mapping
key1:
  key2: value

# Inline Mapping (Avoid)
key1: { key2: value }
```
- Sequences
```yaml
# Sequence -> [value1, value2]
- value1
- value2

# Nested Sequence -> [[value]]
- 
  - value

# Inline Sequence
- [value1, value2]
```
- Sequence in Mapping
```yaml
# Below two expressions are identical
key: 
  - value1
  - value2

key:
- value1
- value2
```
- Mapping in Sequence
```yaml
# Below two expressions are identical
- 
  key1: value1
  key2: value2

- key1: value2
  key2: value2

# Below two expressions are identical, not equal to the previous one
- key1: value1
- key2: value2

- 
  key1: value1
- 
  key2: value2
```


## References
- https://cloudacademy.com/learning-paths/cloud-academy-docker-in-depth-129/
