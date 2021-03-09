import cv2 as cv
import numpy as np
names = list(map(lambda a: str(a)+".png", list(range(8))))
imgs = []
for name in names:
    imgs += [cv.imread(name, cv.IMREAD_COLOR)]

print(names)

# block = 3072 // len(imgs)
# result = imgs[0].copy()
# for i, img in enumerate(imgs):
#     result[0:-1,block*i:block*(i+1),:] = img[0:-1,block*i:block*(i+1),:]
# cv.imwrite("result.jpg", result)

#------------------------------------------------------------------

# result = np.zeros((3000, 5000, 3), np.uint8)
# result[:] = (30,30,30)
# (startR, startC), (offsetR, offsetC) = (200, 500), (70, 70)
# for i,img in enumerate(imgs):
#     cropped = img[160:-1, 0:-30, :]
#     #cv.imwrite(str(i)+"_cropped.jpg", cropped)
#     result[startR+offsetR*i:startR+offsetR*i+np.shape(cropped)[0], startC+offsetC*i:startC+offsetC*i+np.shape(cropped)[1], :] = cropped
# cv.imwrite("result.jpg", result)

#------------------------------------------------------------------

img = cv.imread("8.png", cv.IMREAD_COLOR)
cv.imwrite("dark.jpg", img[160:-1, 0:-30, :])