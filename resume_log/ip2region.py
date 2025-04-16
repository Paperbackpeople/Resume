# ip2region.py
import sys
from xdbSearcher import XdbSearcher

DB_PATH = "/root/ip2region.xdb"

def search_ip(ip):
    searcher = XdbSearcher(contentBuff=XdbSearcher.loadContentFromFile(DB_PATH))
    region = searcher.search(ip)
    searcher.close()
    return region

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python ip2region.py <ip>")
        sys.exit(1)
    ip = sys.argv[1]
    try:
        region = search_ip(ip)
        print(region)
    except Exception as e:
        print("error")