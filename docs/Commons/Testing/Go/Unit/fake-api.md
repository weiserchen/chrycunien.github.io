# Fake APIs
```go
type Client struct {
	Key     string
	baseURL string
}

func (c *Client) BaseURL() string {
	if c.baseURL == "" {
		return "https://api.stripe.com"
	}
	return c.baseURL
}

func (c *Client) Charge(amount int, source, desc string) (*Charge, error) {
	v := url.Values{}
	v.Set("amount", strconv.Itoa(amount))
	v.Set("currency", "usd")
	v.Set("source", source)
	v.Set("description", desc)
	req, err := http.NewRequest(http.MethodPost, c.BaseURL()+"/v1/charges", strings.NewReader(v.Encode()))
	if err != nil {
		return nil, err
	}
	req.SetBasicAuth(c.Key, "")
	var client http.Client
	res, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()
	resBytes, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}
	var charge Charge
	err = json.Unmarshal(resBytes, &charge)
	if err != nil {
		return nil, err
	}
	return &charge, nil
}
```
```go
func TestClient(t *testing.T) (*Client, *http.ServeMux, func()) {
    mux := http.NewServeMux()
    server := httptest.NewServer(mux)
    c := &Client{
        baseURL: server.URL
    }
    return c, mux, func() {
        server.close()
    }
}
```
```go
func TestApp(t *testing.T) {
	client, mux, teardown := stripe.TestClient(t)
	defer teardown()

	mux.HandleFunc("/v1/charges", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, `{"id":"ch_1DEjEH2eZvKYlo2CxOmkZL4D","amount":2000,"description":"Charge for demo purposes.","status":"succeeded"}`)
	})

	// Now inject client into your app and run your tests - they will use your
	// local test server using this mux
	app := App{
		Stripe: client,
	}
	app.Run()
	// ...
}
```