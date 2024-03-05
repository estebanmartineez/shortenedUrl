db.createUser(
    {
        user: "user",
        pwd: "userPassword",
        roles: [
            {
                role: "readWrite",
                db: "shortenedUrl"
            }
        ]
    }
);