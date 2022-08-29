import requests
import ujson
import redis

import re
import time

import pprint

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

    return page
    # r.set(f"wait_{page['id']}", ujson.dumps(page))


session = requests.Session()
# r = redis.Redis(host='132.249.242.203')
r = redis.StrictRedis(host="132.249.242.203", port=6379, db=0, password='kungfurubberducky2022')

def main():
    start_time = time.time()
    
    temp = ujson.loads(getPage("https://waitz.io/live/ucsd").content)['data']
    toReturn = {}
    for page in temp:
        toReturn[page['name']] = parsePage(page)

    p = pprint.PrettyPrinter(indent=4)
    p.pprint(toReturn.keys())

    r.set('wait_time', ujson.dumps(toReturn))

    # p = Pool(6)
    # p.map(parsePage, temp)
    #
    # p.terminate()
    # p.join()


if __name__ == "__main__":
    main()

