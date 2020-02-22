 # Go parameters
    GOCMD=go
    GOBUILD=$(GOCMD) build
    GOCLEAN=$(GOCMD) clean
    GOTEST=$(GOCMD) test
    GOGET=$(GOCMD) get
    BINARY_NAME=users
    
all: buildui run
    buildserver: 
		$(GOBUILD) -o $(BINARY_NAME) -v
    clean: 
		$(GOCLEAN)
		rm -f $(BINARY_NAME)
    run:
		$(GOBUILD) -o $(BINARY_NAME)
		./$(BINARY_NAME)
    buildui: 
		cd ui && npm run build
    