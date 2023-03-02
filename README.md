This project is from the Complete 2023 Web Development Bootcamp.

In this lesson, it's all about authentication and security. Teaches about how to create and save user's data and get them to be able to login.

<!-- Lesson 1 -->
In lesson 1, we've talked about storing user's data into mongoDB with plain strings for emails and passwords. But that's unsafe if anyone were to hack into our database, all of customer's credentials would get leaked.


<!-- Lesson 2 -->
This lesson also teaches how to encrypt and decrypt passwords using mongoose-encryption. This way, user's information and password will be stored securely in our database.
Bus this is also unsafe because if the code is published onto Github or anywhere that people can access the code publicly. Anyone would be able to decrypt user's datas using mongoose-encryption.

<!-- Lesson 3 -->