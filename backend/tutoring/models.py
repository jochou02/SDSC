from django.db import models

# Create your models here.

class Course(models.Model):

    DEPT_LIST = [('CSE', 'CSE'), ('MATH', 'MATH'), 
        ('COGS', 'COGS'), ('POLI', 'POLI'), ('CHEM', 'CHEM')]

    course_dept = models.CharField(max_length=10, choices=DEPT_LIST)
    course_num = models.CharField(max_length=200, null=True)
    prof = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return f'{self.course_dept} {self.course_num}'