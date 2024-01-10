Best Courses Ever

Образовательная платформа c возможностью смотреть и редактировать медиа контент.
Пользователи могут редактировать и смотреть созданные курсы.
Пользователи могут создавать собственные курсы.
Курсы содержат описание и наборы занятий.
Список и описание всех курсов (a также описание занятий) доступно всем пользователям.
Также есть возможность добавлять комментарии к занятию и видеть комментарии других пользователей.
Каждое занятие может содержать описание, видео, ссылки, файлы как другой тип ресурсов.
Чтобы y пользователя появился доступ к занятиям несобственного курса, автор курса может добавить пользователя в список разрешеннных аккаунтов.
Дополнительные функции, такие как поиск по сайту по запросу, загрузка файлов и т. д

<!--  -->
Cтэк:
NodeJs, Fastify, MongoDB

<!--  -->
Модель данных:
1. Course(Courses)
-id
-title
-description
-category
-difficulty
-attached
-rating
-comments
-lessons (сущность 3.Lessons)

2.User(users)
-id
-login
-password
-token(?)
-role
-ownCourses (сущность 1.Courses)
-availableCourses (сущность 1.Courses)

3.Lesson(Lessons)
-id
-title
-description
-video
-comments (сущность 4.Comments)
-attached

4. Comment(Comments)
-id
-author
-date
-description

<!--  -->
Эндпоинты:
+++Course:
1. GET courses list
response: array of course's objects
Object contains Lessons, Lesson contains Comments
2. GET course by id
response: object of course
Object contains Lessons, Lesson contains Comments
3. POST course by id
response: course id
4. PATCH course by id
response: course id

+++Lesson:
1. POST comment by course id and lesson id
2. POST rating by course id and lesson

+++User:
1. GET users list
response: array of user's object
2. GET user by id
response: object of user
3. PATCH user by id (+accesses)
response: user id

+++Login:
8. GET login
9. POST register info

<!--  -->

