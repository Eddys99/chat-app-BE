curl -X POST \
    http://localhost:3035/user/login \
    -H 'cache-control: no-cache' \
    -H 'content-type: application/json' \
    -d '{
        "username": "someUsername",
        "email": "someEmail@someYahoo.com",
        "password": "somePassword"
    }'
