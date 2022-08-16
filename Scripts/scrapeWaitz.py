import requests
import ujson
import redis

import re
import time

import pprint

from bs4 import BeautifulSoup
from multiprocessing import Pool

from tqdm import tqdm


def getPage(url = "https://waitz.io/ucsd"):
    return session.get(url)


def parsePage(page):
    del(page['locHtml'])
    if (page['subLocs']):
        for i in page['subLocs']:
            try:
                del(i['subLocHtml'])
                del(i['liveHTML'])
                del(i['updateHtml'])
            except:
                pass

    r.set(f"wait_{page['id']}", ujson.dumps(page))


session = requests.Session()
r = redis.Redis(host='132.249.242.203')

def main():
    start_time = time.time()
    
    temp = ujson.loads(getPage("https://waitz.io/live/ucsd").content)['data']

    p = Pool(6)
    p.map(parsePage, temp)

    p.terminate()
    p.join()

    print("Time took: ", time.time() - start_time)


if __name__ == "__main__":
    main()

