# Event Person API Spec

## Create Event Person

Endpoint : POST /api/events/:idEvent/person

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
	"event_id": 1,
	"person_id": 1
}
```

Response Body (Success) :

```json
{
	"data": {
		"id": 1,
        "title": "Team Meeting Presentation",
        "start": "2024-08-01 10:00:00",
        "end": "2024-08-01 11:00:00",
        "timezone": "UTC",'
        "isAllDay":false,
        "isFindTime":true,
        "user_id":1,
        "person":[
            {
                "id":1,
                "person_name": "August Dean",
                "person_email": "agust@example.com"
            }
        ]
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "person ID is required"
}
```

## Get Event Person

Endpoint : GET /api/events/:idEvent/person/:idPerson

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
	"data": {
		"id": 1,
        "title": "Team Meeting Presentation",
        "start": "2024-08-01 10:00:00",
        "end": "2024-08-01 11:00:00",
        "timezone": "UTC",'
        "isAllDay":false,
        "isFindTime":true,
        "user_id":1,
        "person":[
            {
                "id":1,
                "person_name": "August Dean",
                "person_email": "agust@example.com"
            }
        ]
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "Event is not found"
}
```

## Update Event Person

Endpoint : PATCH /api/events/:idEvent/person/:idPerson

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
	"person_id": 3
}
```

Response Body (Success) :

```json
{
	"data": {
		"id": 1,
        "title": "Team Meeting Presentation",
        "start": "2024-08-01 10:00:00",
        "end": "2024-08-01 11:00:00",
        "timezone": "UTC",'
        "isAllDay":false,
        "isFindTime":true,
        "user_id":1,
        "person":[
            {
                "id":3,
                "person_name": "August Dean",
                "person_email": "agust@example.com"
            }
        ]
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "person ID is required"
}
```

## Remove Event Person

Endpoint : DELETE /api/events/:idEvent/person/:idPerson

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
	"errors": "Data is not found"
}
```

## List Event Person

Endpoint : GET /api/events/:idEvent/person

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
	"data": [
		{
            "id": 1,
            "title": "Team Meeting Presentation",
            "start": "2024-08-01 10:00:00",
            "end": "2024-08-01 11:00:00",
            "timezone": "UTC",'
            "isAllDay":false,
            "isFindTime":true,
            "user_id":1,
            "person":[
                {
                    "id":1,
                    "person_name": "August Dean",
		            "person_email": "agust@example.com"
                }
            ]
		},
		{
			"id": 2,
			"title": "Design Review",
            "start": "2024-08-03 10:00:00",
            "end": "2024-08-03 11:00:00",
            "timezone": "UTC",'
            "isAllDay":false,
            "isFindTime":true,
            "user_id":1,
            "person":[
                 {
                    "id":1,
                    "person_name": "August Dean",
		            "person_email": "agust@example.com"
                }
            ]
		}
	]
}
```

Response Body (Failed) :

```json
{
	"errors": "Event is not found"
}
```
