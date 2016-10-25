import math


def printable_size(fsize):
    if isinstance(fsize, str):
        fsize = float(fsize)
    if fsize == 0:
        return '0 B'
    prefixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
    tens = int(math.log(fsize, 1024))
    fsize = round(fsize / math.pow(1024, tens), 2)
    if tens < len(prefixes):
        return '%.2f %s' % (fsize, prefixes[tens])
    else:  # uhhhh, we should never have a file this big
        return '%.2f %s' % (fsize * 1024 ** tens, 'B')
