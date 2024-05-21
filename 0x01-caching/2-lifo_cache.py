#!/usr/bin/env python3
""" BasicCache module
"""
from base_caching import BaseCaching

class LIFOCache(BaseCaching):
    """ LIFOCache defines:
      - Caching system inherit from BaseCaching
    """

    def __init__(self):
        """ Initiliaze
        """
        super().__init__()
        self.cacheList = []

    def put(self, key, item):
        """ Add an item in the cache
        """
        if key and item:
            if key in self.cache_data:
                self.cacheList.remove(key)
            elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                discard = self.cacheList.pop()
                print("DISCARD: {}".format(discard))
                del self.cache_data[discard]
            self.cacheList.append(key)
            self.cache_data[key] = item

    def get(self, key):
        """ Get an item by key
        """
        return self.cache_data.get(key, None)
