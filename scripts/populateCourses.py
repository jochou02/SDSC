import requests
import ujson

import re

from tqdm import tqdm
import time

import requests
import redis
import mariadb

from multiprocessing import Pool
from bs4 import BeautifulSoup


def getCourseName(cur):
    page = requests.get(
        "https://seascape.app/listing"
    )

    foo = re.findall("(?<=<a href=\"/course).*?(?=</a>)", page.text)

    toReturn = []

    for i in foo:
        temp = i.split(' ')

        toPrint = []
 
        
        dept = temp[3].split('>')[1]
        num = temp[4]

        cur.execute(f"INSERT INTO tutoring_course (course_dept, course_num) VALUES ('{dept}', '{num}')")
    return toReturn


def main():
    conn = mariadb.connect(
        host="132.249.242.127",
        port=3306,
        user="kfrd22",
        password="sungod123")
   
    cur = conn.cursor()
    cur.execute("USE merge_test2")
    
    foo = getCourseName(cur)
    conn.commit()
    

session = requests.Session()
r = redis.Redis(host='132.249.242.203')

if __name__ == "__main__":
    start_time = time.time()

    main()

    print(time.time() - start_time)
