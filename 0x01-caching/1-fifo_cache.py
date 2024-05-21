#!/usr/bin/python3
"""FIFOCache Module"""

from base_caching import BaseCaching

class FIFOCache(BaseCaching):
    """FIFOCache class

    Args:
        BaseCaching (obj): BaseCaching module
    """
    def __init__(self):
        """ Intiate FIFOCache class
        """
        super().__init__()
        self.order = []

    def put(self, key, item):
        """ Add an item in the cache """
        if key is None or item is None:
            return

        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            first_key = self.order.pop(0)
            print(f"DISCARD: {first_key}")
            del self.cache_data[first_key]

        self.cache_data[key] = item
        self.order.append(key)

    def get(self, key):
        """ Get an item by key """
        return self.cache_data.get(key, None)
