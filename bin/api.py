#!/usr/local/bin/python3
# -*- coding: utf-8 -*-

import sys
import re
import subprocess

def main():
    nginx_file = "/usr/local/etc/nginx/servers/m.yunchou.com.conf"
    api_url = "http://mdapi.yunchou.com:88"
    file_data = None
    if len(sys.argv) > 1:
        package_name = sys.argv[1]
        api_url = "http://mdapi.yunchou.com:8383/%s/api" % package_name
    with open(nginx_file, "r") as file:
        file_data = file.read()
    with open("%s.bak" % nginx_file, "w") as file:
        file.write(file_data)
    file_data = re.sub(r"http:\/\/mdapi\.yunchou\.com.+(88|api)", api_url, file_data)
    with open(nginx_file, "w") as file:
        file.write(file_data)
    subprocess.call(["sudo", "nginx", "-s", "reload"])

if __name__ == "__main__":
    main()
