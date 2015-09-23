#coding:utf-8
import hashlib
import pinyin
from PIL import Image, ImageDraw, ImageFont

def reverseColor(r, g, b):
    return (255 - r, 255 - g, 255 - b)

def grayscaleColor(r, g, b):
    a = (r + g + b) / 3
    return (a, a, a)

def GetPinyin(name):
    return pinyin.get(name)

def GetHash(name):
    return hashlib.md5(name.encode('utf-8')).hexdigest().upper()

def GetBaseColor(k):
    base = [
            (11,217,241),
            (153,18,216),
            (48,52,231),
            (83,240,101),
            (51,235,2),
            (239,175,119),
            (242,167,227)
            ]
    return base[k]

def GetImg(width, height, pixels, key, chinesename):
    image = Image.new("RGB",(width,height))
    font = ImageFont.load_default()
    pixel = image.load()

    for i in range(250):
        for j in range(250):
            pixel[i,j]=(255,255,255)

    for i in range(3):
        for j in range(5):
            if int(pixels[i*5+j]) == 0:
                for pi in range(50):
                    for pj in range(50):
                        pixel[pi+i*50,pj+j*50] = GetBaseColor(key)

    for i in range(3,5):
        for j in range(5):
            if int(pixels[(i-3)*5+j])== 0:
                for pi in range(50):
                    for pj in range(50):
                        pixel[249 -(pi+(i-3)*50),pj+j*50] = GetBaseColor(key)
    filename= chinesename + ".png"
    image.save(filename,"PNG")

def GenAvatar(chinesename):
    name = GetHash(GetPinyin(chinesename))
    name = list(name)
    pixel = name[0:32]
    result = list()

    for p in pixel:
        if ord(p)%2 == 0:
            result.append('0')
        else:
            result.append('1')
    k = 0
    for i in range(25,31):
        k += int(result[i])
    GetImg(250,250,result,k,GetPinyin(chinesename))

if __name__=="__main__":

    chinesename = [u"哈哈",u"么么哒",u"朱盛",u"chuanwu",u"程序猿",u"开发",u"文祥",u"金涛","github"]
    for name in chinesename:
        GenAvatar(name)

