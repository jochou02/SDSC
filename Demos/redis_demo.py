import redis
import ujson
import pprint

# Open a connection to our Redis cache.
# 132.249.242.203 is the cloud instance where cache is on
r = redis.Redis(host='132.249.242.203')

# grab the value associated with key from redis
# our course keys are just course names in the same format as below
a = r.get('CSE 100')

# Note this is in bytes
print(type(a), a)

# To use it, convert to dict using ujson, which is json lib but faster
a = ujson.loads(a)
print(type(a), a)
# Note you can now operate on it like a dict
print(a['AvgApproval'])

print("****")

# grab a wait-time
# the keys are of the format wait_id, where id is the id of the location

b = ujson.loads(r.get('wait_8'))

p = pprint.PrettyPrinter(indent = 4)
p.pprint(b)

print("")

# Example use case.
print(f"There are {b['people']} people currently at {b['name']}")
