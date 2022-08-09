from django.core.management.base import BaseCommand
from account.models import *
import string, random
from account.LISTS import *

class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        #   Courses

        a = [i for i in range(1, 100)]
        
        cd = random.choices(DEPT_LIST, k=10)
        
        cn = random.choices(a, k=10)
        
        for i in range(10):
            c =  Course(course_dept = cd[i][0], course_num = cn[i])
            c.save()
            print(c)

        #auth_user(u_id 13 - 38)

        usernames = string.ascii_lowercase
        lastnames = string.ascii_lowercase
        
        firstnames = ['Alice', 'Bob', 'Eve', 'Trent', 'Mallory', 'John', 'Tan', 'Caleb',
            'Andrew', 'Emily', 'Evelyn', 'Jiting', 'Keystone', 'Corona', 'BudLight',
            'Kirin', 'Sapporo', 'Ebisu', 'Shifu', 'Tigress', 'Mantis', 'PandaHimself', 'Monkey',
            'Crane', 'Viper', 'Oogway']
        
        pword = "abc"
        
        for i in range(26):
            temp = User.objects.create_user(username=usernames[i], password=pword)
            temp.email = usernames[i] + "@ucsd.edu"
            temp.first_name = firstnames[i]
            temp.last_name = lastnames[i]
            temp.save()

        # Student (u_id 13 - 38)

        c = list(Course.objects.all())
        
        for i in range(13, 39):
            temp = Student(id = i)
            temp.user_major = random.choice(MAJOR_LIST)[0]
            temp.user_college = random.choice(COLLEGE_LIST)[0]
        
            interests = random.choices(INTEREST_LIST, k=3)
        
            temp.user_interest1 = interests[0][0]
            temp.user_interest2 = interests[1][0]
            temp.user_interest3 = interests[2][0]
        
            temp.save()
        
            courses = random.choices(c, k=3)
            for j in courses:
                temp.current_courses.add(j)
        
            temp.save()
        print('DONE')