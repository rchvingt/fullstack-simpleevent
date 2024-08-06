# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
	"username": "July",
	"password": "july_pwd",
	"name": "Julian Smith"
}
```

Response Body (Success) :

```json
{
	"data": {
		"username": "july",
		"name": "Julian Smith"
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "Username must not blank, ..."
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
	"username": "july",
	"password": "july_pwd"
}
```

Response Body (Success) :

```json
{
	"data": {
		"username": "july",
		"name": "Julian Smith",
		"token": "uuid"
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "Username or password wrong, ..."
}
```

## Get User

Endpoint : GET /api/users/current

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
	"data": {
		"username": "july",
		"name": "Julian Smith"
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "Unauthorized, ..."
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
	"password": "july_pwd", // tidak wajib
	"name": "Julian Smith Change" // tidak wajib
}
```

Response Body (Success) :

```json
{
	"data": {
		"username": "july",
		"name": "Julian Smith Change"
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "Unauthorized, ..."
}
```

## Logout User

Endpoint : DELETE /api/users/current

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
	"data": "OK"
}
```

Response Body (Failed) :

```json
{
	"errors": "Unauthorized, ..."
}
```
