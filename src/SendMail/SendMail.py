#!/usr/bin/env python
#coding:utf-8

import smtplib
from email.mime.text import MIMEText

def SendMail(topic,content,touser):
    fromuser = "799456678@qq.com"
    _pwd  = ""

    #使用MIMEText构造符合smtp协议的header及body
    msg = MIMEText(content)


    msg["Subject"] = topic
    msg["From"]    = fromuser
    msg["To"]      = touser
    # Record the MIME types of both parts - text/plain and text/html.

    s = smtplib.SMTP("smtp.qq.com", timeout=30)
    s.login(fromuser, _pwd)
    s.sendmail(fromuser, touser, msg.as_string())
    s.close()

if __name__ == "__main__":
    SendMail(u"topic",u"test","chuanwusun@gmail.com")

