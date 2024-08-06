# Person API Spec

## Create Person

Endpoint : POST /api/persons

Request Body :

```json
{
	"person_name": "August Dean",
	"person_email": "agust@example.com"
}
```

Response Body (Success) :

```json
{
	"data": {
		"person_name": "August Dean",
		"person_email": "agust@example.com"
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "Person name must not blank, ..."
}
```

## Get Person

Endpoint : GET /api/persons/:id

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
	"data": {
		"id": 1,
		"person_name": "August Dean",
		"person_email": "agust@example.com"
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "Unauthorized, ..."
}
```

## Update Person

Endpoint : PATCH /api/persons/:id

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
	"person_name": "August Dean Jean",
	"person_email": "agust@example.com Change"
}
```

Response Body (Success) :

```json
{
	"data": {
		"person_name": "August Dean Jean",
		"person_email": "agust@example.com Change"
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "Unauthorized, ..."
}
```

## Search Person

Endpoint : GET /api/persons

Query Parameter :

- name : string, person name, optional
- email : string, person email, optional
- page : number, default 1
- size : number, default 10

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
	"data": [
		{
			"id": 1,
			"person_name": "August Dean",
			"person_email": "agust@example.com"
		},
		{
			"id": 2,
			"person_name": "August Dean",
			"person_email": "agust@example.com"
		}
	],
	"paging": {
		"current_page": 1,
		"total_page": 10,
		"size": 10
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "Unauthorized"
}
```

## Remove Person

Endpoint : DELETE /api/persons/:id

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
	"errors": "Person is not found"
}
```
