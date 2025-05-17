# STackMeet APIs

authROuter

- POST /signup
- POST /login
- POST /logout

profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

connectionRequestRouter

- POST /request/send/interested/:status/:userId
- POST /request/send/ignored/:status/:userId

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

userRouter

- GET /connections
- GET /requests/received
- GET /feeds -Gets profiles of other users on platform.

Status: ignore, interested, accepted, rejected
