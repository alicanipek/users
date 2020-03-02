package main

import (
	"log"
	"net/http"

	"github.com/alicanipek/users/api"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/users", api.GetUsers).Methods("GET")
	router.HandleFunc("/user/{userid}", api.GetUser).Methods("GET")
	router.HandleFunc("/users", api.CreateUser).Methods("POST")
	router.HandleFunc("/user/{userid}", api.UpdateUser).Methods("PUT")
	router.HandleFunc("/user/{userid}", api.DeleteUser).Methods("DELETE")

	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS", "DELETE"})
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./ui/build/")))

	log.Fatal(http.ListenAndServe(":8000", handlers.CORS(originsOk, headersOk, methodsOk)(router)))
}
