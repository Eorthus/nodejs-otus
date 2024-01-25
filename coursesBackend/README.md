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
NodeJs, ExpressJs, MongoDB

<!--  -->
Модель данных:
1. Course(Courses)
-id
-title
-description
-category
-difficulty
-rating
-comments (сущность 4.Comments)
-lessons (сущность 3.Lessons)

2.User(users)
-id
-login
-password
-role
-ownCourses (сущность 1.Courses)
-availableCourses (сущность 1.Courses)

3.Lesson(Lessons)
-id
-title
-description
-video
-attached

4. Comment(Comments)
-id
-author
-date
-description

5. Categories
-id
-title
-name

6. Difficulties
-id
-title
-name

<!--  -->
Эндпоинты:
+++Course:
1. GET courses list
2. GET course by id
3. POST course
4. PATCH course by id
5. PATCH course rating
6. PATCH course comments

+++User:
1. GET users list
2. GET user by id
3. PATCH user by id
4. PATCH user courses by id

+++Login:
8. GET login
9. POST register info

<!--  -->

