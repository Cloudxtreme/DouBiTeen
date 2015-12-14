# -*- encoding=utf-8 -*-

import os
import pinyin
try:
    from PIL import Image, ImageDraw, ImageFont, ImageEnhance
except ImportError:
    import Image, ImageDraw, ImageFont, ImageEnhance

def GetTextImg(text,num=0):

    im = Image.new("RGB", (1600, 800), (234, 233, 233))
    dr = ImageDraw.Draw(im)
    font = ImageFont.truetype(os.path.join(os.path.dirname(os.path.abspath(__file__)), "fz.TTF"), 500)

    dr.text((150, 140), text, font=font, fill="#555555")

    filename = str(num) + ".png"
    im.save(os.path.join(os.path.dirname(os.path.abspath(__file__)), filename))

#    filename = pinyin.get(text) + ".png"
#    im.save(os.path.join(os.path.dirname(os.path.abspath(__file__)), filename))

if __name__=="__main__":
    f = open('namelist','r')
    i = 0
    for line in f.readlines():
        i = i + 1
        if line:
            GetTextImg(line.decode('utf-8'),i)
            print line
        else:
            break
    namelist=[u"文",u"周",u"朱",u"崔",u"金",u"董",u"许",u"黄",u"俞",u"赵",u"陈",u"孙"]
    i = 0
    for name in namelist:
        i = i + 1
#        GetTextImg(name,i)

