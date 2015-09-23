# -*- encoding=utf-8 -*-

import os
import pinyin
try:
    from PIL import Image, ImageDraw, ImageFont, ImageEnhance
except ImportError:
    import Image, ImageDraw, ImageFont, ImageEnhance

def GetTextImg(text):
    im = Image.new("RGB", (80, 80), (234, 233, 233))
    dr = ImageDraw.Draw(im)
    font = ImageFont.truetype(os.path.join(os.path.dirname(os.path.abspath(__file__)), "fz.TTF"), 50)

    dr.text((15, 14), text, font=font, fill="#555555")

    filename = pinyin.get(text) + ".png"
    im.save(os.path.join(os.path.dirname(os.path.abspath(__file__)), filename))

if __name__=="__main__":
    namelist=[u"文",u"周",u"朱",u"崔",u"金",u"董",u"许",u"黄",u"俞",u"赵",u"陈",u"孙"]
    for name in namelist:
        GetTextImg(name)

