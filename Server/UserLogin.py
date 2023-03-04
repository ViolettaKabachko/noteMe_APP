class UserLogin:
    def from_db(self, user_id, db):
        self.user = db.get_user(user_id)
        return self

    def create_user(self, user):
        self.user = user
        return self

    @property
    def is_authenticated(self):
        return True

    @property
    def is_active(self):
        return True

    @property
    def is_anonymus(self):
        return False

    def get_id(self):
        return str(self.user[0])
