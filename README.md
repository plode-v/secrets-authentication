This project is from the Complete 2023 Web Development Bootcamp.

In this lesson, it's all about authentication and security. Teaches about how to create and save user's data and get them to be able to login.

<!-- Lesson 1 -->
In lesson 1, we've talked about storing user's data into mongoDB with plain strings for emails and passwords. But that's unsafe if anyone were to hack into our database, all of customer's credentials would get leaked.


<!-- Lesson 2 -->
Lesson 2, This lesson also teaches how to encrypt and decrypt passwords using mongoose-encryption. This way, user's information and password will be stored securely in our database.
Bus this is also unsafe because if the code is published onto Github or anywhere that people can access the code publicly. Anyone would be able to decrypt user's datas using mongoose-encryption.


To make our data more secure, we use environment variables (dotenv npm). Use require("dotenv").config(); It's also important to put this code on the first line.
To access the variables from .env, type process.env.NAME;
By using this, it will be save for us to push our code without any confidential data onto GitHub repo.
BUT, make sure to include .env in .gitignore file as well.

<!-- Lesson 3 -->
Lesson 3, This lesson we talk about Hashing passwords. Use Hash function that turn passwords into a hash.
Install md-5 npm. Use md5(req.body.password)

<!-- Lesson 4 -->
Lesson 4, we talk about salting. To prevent for any cracking in hash passwords from short or insecured passwords. Salting make hash more complex by adding more random numbers/characters in front or after the hash passwords.
Also use bcrypt and more salting rounds.