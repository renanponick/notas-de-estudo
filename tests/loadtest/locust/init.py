from email import header
from locust import HttpUser, TaskSet, task, between

usersInfo = [
    ("teste@teste.com", "123456")
]

checkSomething = {
    "operationName": "checkSomething", 
    "query": 'query checkSomething{ checkSomething{ something } }',
}

class UserBehavior(TaskSet):
    def on_start(self):
        self.email="Not_exist"
        self.password="Not_exist"
        if len(usersInfo) > 0:
            self.email, self.password = usersInfo.pop()
        self.client.post(
            "/graphql",
            name="Graphql",
            json={
                "operationName": "login", 
                "query": "mutation login { login( input: { email: \"%s\", password: \"%s\" }) { token } }" % (self.email, self.password),
            }
        )

    @task(1)
    def checkSomething(self):
        response = self.client.post("/graphql", json=checkSomething)
        print(self.email + "\nCheckSomething: " + response.text)

class User(HttpUser):
    tasks=[UserBehavior]
    wait_time = between(3, 5)
    host = "http://localhost:3000"
