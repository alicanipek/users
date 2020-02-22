package api

// User struct for user collection
type User struct {
	UserID int
	Name   string
	Age    int
	City   string
}

// Counter struct for unique userid
type Counter struct {
	Seq int
}
