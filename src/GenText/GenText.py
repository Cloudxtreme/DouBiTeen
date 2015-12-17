# -*- encoding=utf-8 -*-

import os
import pinyin
try:
    from PIL import Image, ImageDraw, ImageFont, ImageEnhance
except ImportError:
    import Image, ImageDraw, ImageFont, ImageEnhance

def GetTextImg(text,num=0,height=5000):

    # withd and heght
    im = Image.new("RGB", (2600, height), (234, 233, 233))
    dr = ImageDraw.Draw(im)
    font = ImageFont.truetype(os.path.join(os.path.dirname(os.path.abspath(__file__)), "fz.TTF"), size=800)

    dr.text((150, 160), text, font=font, fill="#555555")

    filename = str(num) + ".png"
    im.save(os.path.join(os.path.dirname(os.path.abspath(__file__)), filename))

#    filename = pinyin.get(text) + ".png"
#    im.save(os.path.join(os.path.dirname(os.path.abspath(__file__)), filename))

if __name__=="__main__":
    f = open('namelist','r')
    i = 0
    name = ""
    for line in f.readlines():
        i = i + 1
        if line:
            name = name + line + '            \n'
#            GetTextImg(line.decode('utf-8'),i)
        else:
            break

    GetTextImg(name.decode('utf-8'),2000,150000)
