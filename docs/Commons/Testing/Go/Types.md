# Test Types

- Unit: Testing very small things, like a function, usually in isolation.
- Integration: Testing 2+ systems together.
- End-to-End: Testing the entire application, or most of it. Usually in a way similar how end user would use the app.

## Unit Tests
Testing very small things, like a function, usually in isolation. Make sure the function works correctly.

```go
// This is an unit
func Magic(a, b int) int {
    return (a + b) * (a + b)
}

// This is the unit test
func TestMagic(t *testing.T) {
    got := Magic(1, 2)
    if got != 9 {
        t.Errorf("Magic() = %v, want %v", got, 9)
    }
}
```

## Integration Tests
Testing 2+ systems together.

```go
type UserStore struct {
    db *sql.DB
}

func (us *UserStore) Create(user *User) error {
    // create a new user entry
}

// Integration test might use a REAL database, meaning it is
// testing the integration of our UserStore with a real SQL
// DB and not some mocked out DB
func TestUserStore_Create(t *testing.T) {
    // ...
}
```

Unit tests, especially one with mocks, only assume that another systems work as expected. Integration tests will verify that our expectations of how the system should work are also correct. For example, you might think a query you construct is valid, but in the real environment, the database may think it is not and return an error. 

Borrow from a [blog](https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html)
> Unit tests do have one major disadvantage: even if the units work well in isolation, you do not know if they work well together.

The goal of integration test is to include the real-world factors into you tests, testing the implmenetation details are correct or not. I think you could say, unit tests are to test the logical correctness and integration tests are to test the implementation correctness.

Common assumption: I'm testing interactions between A and B, but I cannot change B.

For example, when you want to integrate with a database (like MySQL, MongoDB), you would not change the code of that database but only call some APIs provided by the database. 

## End-to-End Tests
Testing the entire application, or most of it.

E2E also typically involves using the entire system in a way similar to how end users would use it. It is great for simluating real user scenarios and catching bugs because it touches a ton of code.

For example, actually open a broswer, navigate to you app, login, and then submit some forms and then test it.

Cons: not always great pointing at Why these bugs occurred or how to fix it. You can figure then out, but they are not clear at first glance.

## References
- 