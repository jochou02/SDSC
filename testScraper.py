import requests
import json

import re

from tqdm import tqdm
import time

import requests

from multiprocessing import Pool
from bs4 import BeautifulSoup


def getURL():
    page = requests.get(
        "https://seascape.app/listing"
    )

    foo = re.findall("(?<=<a href=\"/course).*?(?=</a>)", page.text)

    toReturn = []

    for i in foo:
        temp = i.split(' ')

        # toPrint = []
        # toPrint.append(temp[0][:-1])
        #
        # toPrint.append(temp[3].split('>')[1] + " " + temp[4])

        toReturn.append(temp[0][:-1])

    return toReturn


def getCourseName(url):
    page = requests.get(
        f"https://seascape.app/course{url}"
    )

    return ((re.search(
        "(?<=<h1 class=\"text-2xl sm:text-3xl font-semibold font-sans flex-grow sm:flex-grow-0\">).*?(?=<\/h1>)",
        page.text).group()))


def getPage(url):
    return session.get(
        f"https://seascape.app/course{url}"
    )


def getCourseAvgGrade(page, pattern):
    return pattern.search(page).group()


def getCourseAvgApproval(page, pattern):
    return pattern.search(page).group()


def getCourseAvgTimeCommitment(page, pattern):
    return pattern.search(page).group()


def formatOutput(approval, time, grade, name):
    print(f"*------{name}------*")
    print(f"Avg. class approval: {approval}    Avg. class grade: {grade}")
    print("Avg. class time commitment:", time)


def formatOutputTQDM(approval, time, grade, name='foo'):
    tqdm.write(
        f"*------{name}------*\n" + f"Avg. class approval: {approval}    Avg. class grade: {grade}\n" + f"Avg. class time commitment: {time}\n")


def formatOutputMS(page):
    # soup = BeautifulSoup(page.text, 'lxml')
    # temp = str(soup.find(id="report-card"))

    temp = page.text

    formatOutputTQDM(getCourseAvgApproval(temp, patternApproval),
                     getCourseAvgTimeCommitment(temp, patternTime),
                     getCourseAvgGrade(temp, patternGrade),
                     "foo")


def main():
    foo = getURL()

    session = requests.Session()

    p = Pool(50)
    records = p.map(getPage, foo)

    p.terminate()
    p.join()

    p = Pool(50)
    p.map(formatOutputMS, records)

    p.terminate()
    p.join()


session = requests.Session()

patternGrade = \
    re.compile("(?<=<span class=\"text-gray-700\"> \().*?(?=\)</span>)")

patternApproval = \
    re.compile("(?<=Avg. class approval</p><h1 class=\"text-xl font-semibold font-mono flex-grow mb-2\">).*?(?=</h1>)")

patternTime = \
    re.compile("(?<=Avg. hours committed</p><h1 class=\"text-xl font-semibold font-mono mb-2\">).*?(?=</h1>)")


if __name__ == "__main__":
    start_time = time.time()

    main()

    print(time.time() - start_time)
