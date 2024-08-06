# Event API Spec

## Create Event

Endpoint : POST /api/events

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
	"title": "Team Meeting",
	"start": "2024-08-01 10:00:00",
	"end": "2024-08-01 11:00:00",
  "timezone": "UTC",'
  "isAllDay":false,
  "isFindTime":true,
  "user_id":1
}
```

Response Body (Success) :

```json
{
	"data": {
		"id": 1,
   	"title": "Team Meeting",
    "start": "2024-08-01 10:00:00",
    "end": "2024-08-01 11:00:00",
    "timezone": "UTC",'
    "isAllDay":false,
    "isFindTime":true,
    "user_id":1
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "title must not blank, ..."
}
```

## Get Event

Endpoint : GET /api/events/:id

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
	"data": {
		"id": 1,
			"title": "Team Meeting",
      "start": "2024-08-01 10:00:00",
      "end": "2024-08-01 11:00:00",
      "timezone": "UTC",'
      "isAllDay":false,
      "isFindTime":true,
      "user_id":1
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "Event is not found"
}
```

## Update Event

Endpoint : PATCH /api/events/current

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
	"title": "Team Meeting Presentation"
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
      "user_id":1
	}
}
```

Response Body (Failed) :

```json
{
	"errors": "title must not blank, ..."
}
```

## Remove Event

Endpoint : DELETE /api/events/:id

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
	"errors": "Event is not found"
}
```

## Search Event

Endpoint : GET /api/events

Query Parameter :

- title : string, event title optional
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
      "title": "Team Meeting Presentation",
      "start": "2024-08-01 10:00:00",
      "end": "2024-08-01 11:00:00",
      "timezone": "UTC",'
      "isAllDay":false,
      "isFindTime":true,
      "user_id":1
		},
		{
			"id": 2,
			"title": "Design Review",
      "start": "2024-08-03 10:00:00",
      "end": "2024-08-03 11:00:00",
      "timezone": "UTC",'
      "isAllDay":false,
      "isFindTime":true,
      "user_id":1
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
