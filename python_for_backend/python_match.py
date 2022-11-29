http_status = 200

if http_status == 200:
    print("Success")
elif http_status == 404:
    print("Not found")
elif http_status == 400:
    print("Bad request")
elif http_status == 500:
    print("Internal server error")
else:
    print("Unknown status code")

match http_status:
    case 200:
        print("Success")