package api

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/gorilla/mux"
)

// GetUsers : get list of all users
func GetUsers(w http.ResponseWriter, r *http.Request) {
	var users []User

	collection := ConnectDB("test", "users")
	cur, err := collection.Find(context.Background(), bson.D{})

	if err != nil {
		HandleError(err, w)
	}

	defer cur.Close(context.TODO())

	for cur.Next(context.TODO()) {
		var user User
		err := cur.Decode(&user)
		if err != nil {
			log.Println(err)
		}

		users = append(users, user)
	}

	if err := cur.Err(); err != nil {
		log.Println(err)
	} else {
		json.NewEncoder(w).Encode(users)
	}
}

// GetUser : get specific user by user id
func GetUser(w http.ResponseWriter, r *http.Request) {
	var user User
	var userid int
	var params = mux.Vars(r)

	collection := ConnectDB("test", "users")
	userid, _ = strconv.Atoi(params["userid"])
	filter := bson.D{primitive.E{Key: "userid", Value: userid}}
	err := collection.FindOne(context.Background(), filter).Decode(&user)
	if err != nil {
		HandleError(err, w)
	} else {
		json.NewEncoder(w).Encode(user)
	}
}

// CreateUser : Create new user
func CreateUser(w http.ResponseWriter, r *http.Request) {
	var user User

	collection := ConnectDB("test", "users")

	err := json.NewDecoder(r.Body).Decode(&user)

	user.UserID = getUniqueID()

	result, err := collection.InsertOne(context.Background(), user)

	if err != nil {
		HandleError(err, w)
	} else {
		json.NewEncoder(w).Encode(result)
	}
}

// UpdateUser : Update user by user id
func UpdateUser(w http.ResponseWriter, r *http.Request) {
	var user User
	var params = mux.Vars(r)
	var userid int
	var update bson.D

	collection := ConnectDB("test", "users")
	userid, _ = strconv.Atoi(params["userid"])
	filter := bson.D{primitive.E{Key: "userid", Value: userid}}
	_ = json.NewDecoder(r.Body).Decode(&user)

	if user.Name != "" {
		update = append(update, bson.E{"name", user.Name})
	}
	if user.City != "" {
		update = append(update, bson.E{"city", user.City})
	}
	if user.Age != 0 {
		update = append(update, bson.E{"age", user.Age})
	}
	updater := bson.D{{"$set", update}}
	after := options.After
	opt := options.FindOneAndUpdateOptions{
		ReturnDocument: &after,
	}
	err := collection.FindOneAndUpdate(context.Background(), filter, updater, &opt).Decode(&user)
	if err != nil {
		HandleError(err, w)
	} else {

		json.NewEncoder(w).Encode(user)
	}
}

// DeleteUser : Delete user by user id
func DeleteUser(w http.ResponseWriter, r *http.Request) {
	var user User
	var params = mux.Vars(r)
	var userid int

	collection := ConnectDB("test", "users")
	userid, _ = strconv.Atoi(params["userid"])
	filter := bson.D{primitive.E{Key: "userid", Value: userid}}
	_ = json.NewDecoder(r.Body).Decode(&user)

	_, err := collection.DeleteOne(context.Background(), filter)
	if err != nil {
		HandleError(err, w)
	}
}

func getUniqueID() int {
	collection := ConnectDB("test", "counter")

	var counter Counter

	filter := bson.M{"_id": "userid"}
	update := bson.D{primitive.E{Key: "$inc", Value: bson.D{primitive.E{Key: "seq", Value: 1}}}}
	after := options.After
	opt := options.FindOneAndUpdateOptions{
		ReturnDocument: &after,
	}
	err := collection.FindOneAndUpdate(context.Background(), filter, update, &opt).Decode(&counter)
	if err != nil {
		log.Fatal(err)
		return -1
	}
	return counter.Seq
}
