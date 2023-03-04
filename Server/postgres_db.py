import psycopg2
from datetime import datetime


class DataBase:
    def __init__(self, **adress):
        self.__database = adress['database']
        self.__user = adress['user']
        self.__password = adress['password']
        self.__host = adress['host']
        self.__port = adress['port']
        self.__info = {
            'database': self.__database,
            'user': self.__user,
            'password': self.__password,
            'host': self.__host,
            'port': self.__port
        }
        self.connection = None

    def connect(self):
        self.connection = psycopg2.connect(**self.__info)

    def close_connection(self):
        self.connection.close()

    def insert_data(self,  first_name: str, second_name: str, nick_name: str, age: str, email: str, password: str):
        cursor = self.connection.cursor()
        with cursor as cur:
            cur.execute(
                '''INSERT INTO users (first_name, second_name, nick_name, age, "e-mail", "password") 
                   VALUES (%s, %s, %s, %s, %s, %s)''',
                (first_name, second_name, nick_name, age, email, password)
            )
            print('Data successfully uploaded')
            self.connection.commit()

    def get_user_by_id(self, user_id: int):
        cursor = self.connection.cursor()
        with cursor as cur:
            cur.execute(
                '''SELECT * FROM users WHERE id = %s''', (user_id,)
            )
            res = cur.fetchone()
            if not res:
                print('There is no such user...')
                return False
            return res

    def get_user_by_email(self, email: str):
        cursor = self.connection.cursor()
        with cursor as cur:
            cur.execute(
                '''select * from users where "e-mail" = %s ''', (email,)
            )
            res = cur.fetchone()
            if not res:
                print('There is no such user...', end='\n\n')
                return False
            return res

    def download_photo(self, photo: bytes, user_id: int):
        cursor = self.connection.cursor()
        with cursor as cur:
            cur.execute(
                '''update users set avatar = %s where id=%s''', (photo, user_id)
            )

    def get_user_posts(self, user_id: int):
        cursor = self.connection.cursor()
        with cursor as cur:
            cur.execute(
                '''select * from posts where creator_id = %s order by date_and_time''', (user_id,)
            )
            res = cur.fetchall()
            if not res:
                return False
            return res

    def upload_post(self, user_id: int, post: str):
        cursor = self.connection.cursor()
        with cursor as cur:
            cur.execute(
                '''insert into posts (posts_text, creator_id, date_and_time) values (%s, %s, %s)''',
                (post, user_id, datetime.strftime(datetime.today(), '%Y-%m-%d %H:%M:%S'))
            )
            self.connection.commit()
            print('Post uploaded')
#  Функция для поиска юзера и принта всей инфы.
